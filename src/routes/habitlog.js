const express = require('express');
const router = express.Router();
const HabitLog = require('../models/HabitLog')

router.post('/', async (req, res) => {
    const { habitId, userId, date, value } = req.body;
  
    const habitLog = new HabitLog({ habitId, userId, date, value });
  
    try {
        await habitLog.save();
        res.status(201).json({ logId: habitLog._id, habitId, date, value });
      } catch (error) {
        console.error('Error creating habit log:', error);
        res.status(400).json({ error: 'Error creating habit log', details: error.message });
      }
  });


  router.get('/:userId/:habitId', async (req, res) => {
    console.log('Request Parameters:', req.params);
    const { userId, habitId } = req.params;
    console.log(`User ID: ${userId}, Habit ID: ${habitId}`);

    try {
        // Find logs for the specific user and habit
        const logs = await HabitLog.find({ userId, habitId }); // Use find() instead of findById()

        // Check if logs were found
        if (!logs.length) {
            return res.status(404).json({ message: 'No logs found for this user and habit.' });
        }

        // Map the logs to return only the required fields
        const responseLogs = logs.map(log => ({
            logId: log._id,
            date: log.date,
            value: log.value
        }));

        res.json(responseLogs);
    } catch (error) {
        console.error('Error fetching habit logs:', error);
        res.status(500).json({ error: 'Error fetching habit logs' });
    }
});


  module.exports = router