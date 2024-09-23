const mongoose = require('mongoose');

const HabitLogSchema = new mongoose.Schema({
  habitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  value: { type: Number, required: true }, // E.g., amount of water, hours of sleep, etc.
});

module.exports = mongoose.model('HabitLog', HabitLogSchema);