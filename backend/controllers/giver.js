const Giver = require('../models/Giver');
const middleware = require('../utils/middleware')
const giverRouter = require('express').Router()

// CREATE: Add a new giver
giverRouter.post('/', middleware.tokenExtractor, async (req, res) => {
    const { name, title, experience_year, description, address, feedback, pets_type } = req.body;

    try {
        const newGiver = new Giver({
            name,
            title,
            experience_year,
            description,
            address,
            pets_type,
            user_id: req.user_id, // Use user_id from token
        });

        await newGiver.save();
        res.status(201).json({ message: 'Giver added successfully.', giver: newGiver });
    } catch (error) {
        console.error('Error adding giver:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// READ: Get all givers
giverRouter.get('/', async (req, res) => {
    try {
        const givers = await Giver.find().populate('user'); // Populate user details
        res.status(200).json(givers);
    } catch (error) {
        console.error('Error fetching givers:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// READ: Get a giver by ID
giverRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const giver = await Giver.findById(id).populate('user');
        if (!giver) {
            return res.status(404).json({ message: 'Giver not found.' });
        }
        res.status(200).json(giver);
    } catch (error) {
        console.error('Error fetching giver:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// READ: Get a giver by name
giverRouter.get('/:name', async (req, res) => {
    const { name } = req.params;

    try {
        // Use findOne to search by the 'name' field
        const giver = await Giver.findOne({ name: name }).populate('user');
        if (!giver) {
            return res.status(404).json({ message: 'Giver not found.' });
        }
        res.status(200).json(giver);
    } catch (error) {
        console.error('Error fetching giver:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


// UPDATE: Update a giver
giverRouter.put('/:id', middleware.tokenExtractor, async (req, res) => {
    const { id } = req.params;
    const { name, title, experience_year, description, address, pets_type } = req.body;

    try {
        const giver = await Giver.findById(id);
        if (!giver) {
            return res.status(404).json({ message: 'Giver not found.' });
        }

        // Update only the fields provided
        if (name) giver.name = name;
        if (title) giver.title = title;
        if (experience_year) giver.experience_year = experience_year;
        if (description) giver.description = description;
        if (address) giver.address = address;
        if (pets_type) giver.pets_type = pets_type;

        await giver.save();
        res.status(200).json({ message: 'Giver updated successfully.', giver });
    } catch (error) {
        console.error('Error updating giver:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// DELETE: Delete a giver
giverRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const giver = await Giver.findByIdAndDelete(id);
        if (!giver) {
            return res.status(404).json({ message: 'Giver not found.' });
        }
        res.status(200).json({ message: 'Giver deleted successfully.' });
    } catch (error) {
        console.error('Error deleting giver:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = giverRouter
