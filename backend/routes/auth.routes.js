const express = require('express');
const router = express.Router();

const User = require('../models/User');


// REGISTER
router.post('/register', async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    res.json({ message: 'User registered' });

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: 'Register error' });

  }

});


// LOGIN
router.post('/login', async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // ✅ send only required data (IMPORTANT)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: 'Login error' });

  }

});



// GET ALL NORMAL USERS (exclude admin)
router.get('/users', async (req, res) => {

  try {

    const users = await User.find({
      role: { $ne: 'admin' }   // ✅ exclude admin
    }).select('-password');

    res.json(users);

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: 'Error fetching users' });

  }

});



module.exports = router;
