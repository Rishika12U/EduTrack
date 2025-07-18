# EduTrack 🎓📊
(https://edutrack-bkkt.onrender.com/)
EduTrack is a full-stack Digital Classroom Monitoring System built with the MERN stack (MongoDB, Express, React, Node.js). It helps school administrators monitor **teacher activities**, **track student learning effectiveness**, **manage quizzes**, and **track attendance** — all in one centralized platform.

## 👨‍🏫 Teachers
- Log daily teaching activities
- Create quizzes for students
- Mark their attendance (with location)

## 🎓 Students
- Take quizzes and receive instant scores
- Submit daily attendance (with location)
- View their quiz results and attendance record

## 🛡️ Admins
- View all teacher and student activities
- Access all attendance records
- Monitor quiz submissions and scores

### 🛠️ Tech Stack

| Frontend              | Backend                | Other Tools              |
|-----------------------|------------------------|--------------------------|
| React (Vite)          | Node.js                | JWT Authentication       |
| Axios                 | Express.js             | CORS / dotenv            |
| React Router DOM      | MongoDB + Mongoose     | Render (Deployment)      |
| CSS (Custom per role) |                        |                          |

## 📁 Folder Structure
EduTrack/
│
├── Backend/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
│ └── app.js
│
├── Frontend/basic-react-app
│ ├── src/
│ │ ├── components/
│ │ ├── Dashboard/
│ │ ├── pages/
│ │ ├── styles/
│ │ ├── axios.js
│ │ └── App.jsx
│ └── index.html

### Backend Setup
cd Backend
npm install

### Run backend:
  npm run dev

### Frontend Setup
cd ../Frontend/basic-react-app
npm install
npm run dev

## Deployment
Frontend and Backend are deployed on Render
CORS configured properly to allow cross-origin requests

## Future Improvements
*Notification system (quiz reminders, announcements)
*Export attendance/quiz reports to PDF/Excel
*Student performance charts and analytics
*Offline mode for rural access

🙋‍♂️ Author
Rishika12U — GitHub
Built with ❤️ to improve rural education monitoring.
