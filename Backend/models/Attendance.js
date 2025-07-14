const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: String, // format: YYYY-MM-DD
    required: true
  },
  location: {
    latitude: Number,
    longitude: Number
  },
  role: {
    type: String,
    enum: ['student', 'teacher'],
    required: true
  }
});

attendanceSchema.index({ user: 1, date: 1 }, { unique: true }); // ✅ prevent duplicate per day

module.exports = mongoose.model('Attendance', attendanceSchema);
