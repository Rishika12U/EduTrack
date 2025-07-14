import React, { useEffect, useState } from 'react';
import API from '../axios';
import AttendanceSection from './AttendanceSection';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';

export default function StudentDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [message, setMessage] = useState('');
  const [submissions, setSubmissions] = useState([]);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchQuizzes = async () => {
    try {
      const res = await API.get('/quizzes/all');
      setQuizzes(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch quizzes', err);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const res = await API.get('/submissions/my', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(res.data)) {
        setSubmissions(res.data);
      } else {
        setSubmissions([]);
      }
    } catch (err) {
      console.error('❌ Failed to fetch submissions', err);
    }
  };

  const handleStartQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setAnswers(new Array(quiz.questions.length).fill(null));
    setScore(null);
    setMessage('');
  };

  const handleOptionSelect = (qIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmitQuiz = async () => {
    try {
      const res = await API.post(
        '/submissions/submit',
        { quizId: selectedQuiz._id, answers },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setScore(res.data.score);
      setMessage('✅ Quiz submitted successfully!');
      fetchSubmissions();
    } catch (err) {
      console.error('❌ Failed to submit quiz', err);
      setMessage('❌ Failed to submit quiz');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    fetchQuizzes();
    fetchSubmissions();
  }, []);

  return (
    <div className="student-dashboard">
      <div className="top-bar">
        <h2>🧑‍🎓 Student Dashboard</h2>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <AttendanceSection />

      {!selectedQuiz ? (
        <div className="main-section">
          <div className="quiz-list-section card">
            <h3>📋 Available Quizzes</h3>
            <ul className="quiz-list">
              {quizzes.map((quiz) => (
                <li key={quiz._id}>
                  {quiz.title} ({quiz.questions.length} questions)
                  <button onClick={() => handleStartQuiz(quiz)}>Take Quiz</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="results-section card">
            <h3>📊 My Quiz Results</h3>
            <ul>
              {submissions.length === 0 && <li>No quizzes attempted yet.</li>}
              {submissions.map((s) => (
                <li key={s._id}>
                  <strong>{s.quiz?.title || 'Untitled Quiz'}</strong> — Score: {s.score} / {s.quiz?.questions?.length || '?'}
                  <br />
                  <small>🗓️ {new Date(s.submittedAt).toLocaleString()}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="quiz-section card">
          <h3>📝 Quiz: {selectedQuiz.title}</h3>
          {selectedQuiz.questions.map((q, i) => (
            <div key={i} className="question-block">
              <p><strong>{i + 1}. {q.questionText}</strong></p>
              {q.options.map((opt, j) => (
                <label key={j}>
                  <input
                    type="radio"
                    name={`question-${i}`}
                    value={j}
                    checked={answers[i] === j}
                    onChange={() => handleOptionSelect(i, j)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          ))}
          <button onClick={handleSubmitQuiz}>Submit Quiz</button>
          {message && <p>{message}</p>}
          {score !== null && (
            <h4>🎯 Your Score: {score} / {selectedQuiz.questions.length}</h4>
          )}
          <button onClick={() => setSelectedQuiz(null)}>Back to Quiz List</button>
        </div>
      )}
    </div>
  );
}
