const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');



router.post('/', async (req, res) => {
    const { userId, name, description } = req.body;
  
    const habit = new Habit({ userId, name, description });
    
    try {
      await habit.save();
      res.status(201).json({ habitId: habit._id, name: habit.name, description: habit.description });
    } catch (error) {
      res.status(400).json({ error: 'Error creating habit' });
    }
  });


  // router.get('/:userId', async (req, res) => {
  //   try{
  //   const userId = req.params.userId ;
  //   const habits = await Habit.findOne(userId).select('name userId');
  //   console.log('rrrrrrrrrrrrrrrrrrrrr',habits);
  //   res.json({habit:habits});
  //   }
  //   catch(e){
  //       res.status(500).send('Server error');
  //   }
  // });

  router.get('/for-user/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const habit = await Habit.find({userId}); // Find habit by the Code field
  
      if (!habit) {
        return res.status(404).json({ message: 'habit not found' });
      }
      
      res.json(habit); // Return the product data
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.delete('/:habitId', async (req, res) => {
    const habit = await Habit.findByIdAndDelete(req.params.habitId);
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }
    res.json({ message: 'Habit deleted' });
  });

  router.get('/:habitId', async (req, res) => {
    try {
      const { habitId } = req.params;
  
      // If habitId is a valid ObjectId, convert it
      const habit = await Habit.findById(habitId);
      
      console.log('Habit:', habit);
  
      if (!habit) {
        return res.status(404).json({ message: 'Habit not found' });
      }
  
      res.status(200).json(habit); // Send back the habit data
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  

  router.put('/:habitId', async (req, res) => {
    const { habitId } = req.params;
    const { name, description } = req.body;
  
    try {
      // Find the habit by id and update its name and description
      const habit = await Habit.findByIdAndUpdate(
        habitId,
        { name, description },
        { new: true } // Return the updated document
      );
  
      if (!habit) {
        return res.status(404).json({ message: 'Habit not found' });
      }
  
      res.json({
        habitId: habit._id,
        name: habit.name,
        description: habit.description,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating habit' });
    }
  });


  module.exports= router;