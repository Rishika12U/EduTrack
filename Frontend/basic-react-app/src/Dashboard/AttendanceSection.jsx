import React, { useEffect, useState } from 'react';
import API from '../axios';

export default function AttendanceSection() {
  const [attendance, setAttendance] = useState([]);
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState(null);

  const token = localStorage.getItem('token');

  const fetchMyAttendance = async () => {
    try {
      const res = await API.get('/attendance/my', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAttendance(res.data);
    } catch (err) {
      console.error('Failed to fetch attendance');
    }
  };

  const markAttendance = async () => {
    if (!location) {
      setMessage('Getting location...');
      return;
    }

    try {
      const res = await API.post(
        '/attendance/mark',
        {
          latitude: location.latitude,
          longitude: location.longitude
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setMessage(res.data.message);
      fetchMyAttendance(); // Refresh table
    } catch (err) {
      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage('Error marking attendance');
      }
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
      },
      (err) => {
        console.error(err);
        setMessage('Location access denied');
      }
    );

    fetchMyAttendance();
  }, []);

  return (
    <div>
      <h3>📍 Attendance</h3>
      <button onClick={markAttendance}>Mark Attendance</button>
      {message && <p>{message}</p>}
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Date</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((a) => (
            <tr key={a._id}>
              <td>{a.date}</td>
              <td>{a.location.latitude.toFixed(4)}</td>
              <td>{a.location.longitude.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
