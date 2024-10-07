import express from 'express';
import User from '../models/User.js';
import Account from '../models/Account.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  const { username, email, password, role } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    role, // This could be optional or set later
  });

  try {
    const savedUser = await newUser.save(); // Save the user

    // Create a new account linked to the user
    const newAccount = new Account({
      email: savedUser.email,
      password: hashedPassword, // Store the hashed password
      userId: savedUser._id, // Link account to user
    });

    await newAccount.save(); // Save the account

    res.status(201).json({ message: 'User and account created successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
