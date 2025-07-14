import React, { useState, useEffect } from 'react';
import API from '../axios';
import AttendanceSection from './AttendanceSection';
import { useNavigate } from 'react-router-dom';
import './TeacherDashboard.css';



export default function TeacherDashboard() {
  const [formData, setFormData] = useState({ subject: '', topic: '', notes: '' });
  const [activityMsg, setActivityMsg] = useState('');
  const [activities, setActivities] = useState([]);

  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', options: ['', '', '', ''], correctAnswer: 0 }
  ]);
  const [quizMsg, setQuizMsg] = useState('');
  const [quizzes, setQuizzes] = useState([]);

  const token = localStorage.getItem('token');

  const fetchActivities = async () => {
    const res = await API.get('/activities', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setActivities(res.data);
  };

  const fetchQuizzes = async () => {
    const res = await API.get('/quizzes/my', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setQuizzes(res.data);
  };

  useEffect(() => {
    fetchActivities();
    fetchQuizzes();
  }, []);

  const handleActivitySubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/activities/log', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData({ subject: '', topic: '', notes: '' });
      setActivityMsg('Activity logged successfully');
      fetchActivities();
    } catch {
      setActivityMsg('Failed to log activity');
    }
  };

  const handleQuizSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/quizzes/create', { title: quizTitle, questions }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQuizTitle('');
      setQuestions([{ questionText: '', options: ['', '', '', ''], correctAnswer: 0 }]);
      setQuizMsg('Quiz created successfully');
      fetchQuizzes();
    } catch {
      setQuizMsg('Failed to create quiz');
    }
  };

  const handleQuestionChange = (i, field, value) => {
    const newQuestions = [...questions];
    newQuestions[i][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qi, oi, value) => {
    const newQuestions = [...questions];
    newQuestions[qi].options[oi] = value;
    setQuestions(newQuestions);
  };

  const addNewQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  };

  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.clear();        // ✅ remove token + role
  navigate('/');          // 🔁 redirect to login page
};


  return (
    

    <div className="teacher-dashboard">
  <div className="dashboard-header">
    <h2>👨‍🏫 Teacher Dashboard</h2>
    <button onClick={handleLogout} className="logout-btn">🚪 Logout</button>
  </div>

  <AttendanceSection />

  <div className="section-card">
    <h3>📘 Log Activity</h3>
    <form onSubmit={handleActivitySubmit}>
      <input name="subject" placeholder="Subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
      <input name="topic" placeholder="Topic" value={formData.topic} onChange={(e) => setFormData({ ...formData, topic: e.target.value })} />
      <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
      <button type="submit">Log Activity</button>
      <p>{activityMsg}</p>
    </form>
  </div>

  <div className="section-card">
    <h3>📝 Create Quiz</h3>
    <form onSubmit={handleQuizSubmit}>
      <input type="text" placeholder="Quiz Title" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} />
      {questions.map((q, i) => (
        <div key={i}>
          <input type="text" placeholder={`Question ${i + 1}`} value={q.questionText} onChange={(e) => handleQuestionChange(i, 'questionText', e.target.value)} />
          {q.options.map((opt, j) => (
            <input key={j} type="text" placeholder={`Option ${j + 1}`} value={opt} onChange={(e) => handleOptionChange(i, j, e.target.value)} />
          ))}
          <select value={q.correctAnswer} onChange={(e) => handleQuestionChange(i, 'correctAnswer', parseInt(e.target.value))}>
            <option value={0}>Correct: Option 1</option>
            <option value={1}>Correct: Option 2</option>
            <option value={2}>Correct: Option 3</option>
            <option value={3}>Correct: Option 4</option>
          </select>
          <hr />
        </div>
      ))}
      <button type="button" onClick={addNewQuestion}>➕ Add Question</button>
      <button type="submit">✅ Submit Quiz</button>
      <p>{quizMsg}</p>
    </form>
  </div>

  <div className="section-card">
    <h4>📚 My Quizzes</h4>
    <ul>
      {quizzes.map(q => (
        <li key={q._id}>
          <strong>{q.title}</strong> ({q.questions.length} questions)
        </li>
      ))}
    </ul>
  </div>

  <div className="section-card">
    <h4>📘 Logged Activities</h4>
    <ul>
      {activities.map(a => (
        <li key={a._id}>
          <strong>{a.subject}</strong>: {a.topic} <br />
          <em>{new Date(a.createdAt).toLocaleString()}</em>
        </li>
      ))}
    </ul>
  </div>
</div>

  );
}
