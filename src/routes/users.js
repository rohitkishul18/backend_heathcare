const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');


router.post('/register', async(req, res) => {
    console.log('Request Body:', req.body);  
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ msg: 'No data received' });
    }else{
            const storeUser= new User(req.body);
              const token =  await storeUser.generateAuthToken();
              console.log(token);
              const dataStore= await storeUser.save();
              console.log(dataStore._id);
              res.status(201).send({user:dataStore, token})
    }
  }); 


  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the request body contains the correct values
      console.log('Request body:', req.body);
  
      // Find the user by username (do not include password in query)
      const user = await User.findOne({ username });
      console.log('Found user:', user);
  
      // If user is not found
      if (!user) {
        return res.status(401).send('Invalid login details: User not found.');
      }
  
      // Compare the provided password with the hashed password in the database
      const matchPassword = await bcrypt.compare(password, user.password);
      console.log('Password match:', matchPassword);
  
      // If the password is valid
      if (matchPassword) {
        return res.status(201).send(`Welcome ${user.username}!`);
      } else {
        return res.status(401).send('Invalid login details: Incorrect password.');
      }
  
    } catch (e) {
      console.error('Login error:', e.message);
      res.status(500).send('Server error');
    }
  });
  

  router.get('/:userId ', async (req, res) => {
    try {
      // Extract userId from request params
      const userId = req.params.userId;
  
      // Find the user by userId and select only the fields you want
      const user = await User.findById(userId).select('username email');
  
      // If user is not found
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Send user details
      return res.status(200).json({
        userId: user._id,
        username: user.username,
        email: user.email
      });
  
    } catch (e) {
      console.error('Error fetching user details:', e.message);
      res.status(500).send('Server error');
    }
  });
  

module.exports = router;