import React, { useEffect, useState } from 'react';
import API from '../axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [activities, setActivities] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [actRes, attRes, subRes] = await Promise.all([
          API.get('/activities/all', { headers: { Authorization: `Bearer ${token}` } }),
          API.get('/attendance/all', { headers: { Authorization: `Bearer ${token}` } }),
          API.get('/submissions/all', { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setActivities(actRes.data);
        setAttendance(attRes.data);
        setSubmissions(subRes.data);
      } catch (err) {
        console.error('❌ Error fetching admin data', err);
      }
    };

    fetchAllData();
  }, [token]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>🛡️ Admin Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <section className="admin-section">
        <h3>📊 Quiz Submissions</h3>
        {submissions.length === 0 ? (
          <p>No quiz submissions found.</p>
        ) : (
          <ul>
            {submissions.map((s) => (
              <li key={s._id} className="admin-card">
                {s.student?.name} scored {s.score} / {s.quiz?.questions?.length ?? 'N/A'} in <strong>{s.quiz?.title}</strong>
                <br />
                <small>{new Date(s.submittedAt).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="admin-section">
        <h3>📍 Attendance Records</h3>
        {attendance.length === 0 ? (
          <p>No attendance records found.</p>
        ) : (
          <ul>
            {attendance.map((a) => (
              <li key={a._id} className="admin-card">
                {a.user?.name} ({a.user?.role}) marked present from 📍{' '}
                <strong>
                  {a.location?.latitude && a.location?.longitude
                    ? `Lat: ${a.location.latitude}, Lng: ${a.location.longitude}`
                    : 'Location unknown'}
                </strong>
                <br />
                <small>{new Date(a.timestamp).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="admin-section">
        <h3>📝 Activity Logs</h3>
        {activities.length === 0 ? (
          <p>No activities found.</p>
        ) : (
          <ul>
            {activities.map((act) => (
              <li key={act._id} className="admin-card">
                {act.user?.name} ({act.user?.role}): {act.activityType}
                <br />
                <small>{new Date(act.timestamp).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
