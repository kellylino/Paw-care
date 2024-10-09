const bcrypt = require('bcrypt')
const registerRouter = require('express').Router()
const User = require('../models/Users')

registerRouter.post('/', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Validate input
        if (!username || !email || !password ) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Validate roles
        // const invalidRoles = selectedRoles.filter(role => !['owner', 'giver'].includes(role));
        // if (invalidRoles.length > 0) {
        //     return res.status(400).json({ message: `Invalid role(s): ${invalidRoles.join(', ')}` });
        // }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with role IDs
        const newUser = new User({
            username,
            email,
            password_hash: hashedPassword,
            roles: selectedRoles,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error during sign up:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = registerRouter