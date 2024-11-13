const userRouter = require('express').Router()
const User = require('../models/Users')

userRouter.get('/', async (req, res) => {
    try {
        const users = await User.find();
        //const owners = await Owner.find().populate('user'); // Populate user details
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = userRouter