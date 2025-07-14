const Quiz = require('../models/Quiz');

exports.createQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;
    const teacherId = req.user.id;

    const quiz = await Quiz.create({
      title,
      teacher: teacherId,
      questions,
    });

    res.status(201).json({ message: 'Quiz created successfully', quiz });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create quiz', error: error.message });
  }
};

exports.getQuizzesByTeacher = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ teacher: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch quizzes' });
  }
};
