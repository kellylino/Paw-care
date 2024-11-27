const Giver = require('../models/Giver');
const User = require('../models/Users')
const middleware = require('../utils/middleware')
const giverRouter = require('express').Router()

// CREATE: Add a new giver
giverRouter.post('/', middleware.tokenExtractor, async (req, res) => {
    const { name, address, description, experience, pets_type, image } = req.body;

    const updatedUser = await User.findById(req.user_id);

    if (!updatedUser) {
        return res.status(404).json({ message: 'User not found.' });
    }

    // Ensure roles is initialized as an array if it is null or undefined
    if (!Array.isArray(updatedUser.roles)) {
        updatedUser.roles = [];
    }

    // Add the role to the array if it's not already present
    if (!updatedUser.roles.includes('giver')) {
        updatedUser.roles.push('giver');
    }

    // Save the updated user document
    await updatedUser.save();

    //console.log('User ID:', req.user_id);
    try {
        const newGiver = new Giver({
            name,
            address,
            description,
            experience,
            pets_type,
            image,
            user: req.user_id, // Use user_id from token
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
        const givers = await Giver.find();
        //const givers = await Giver.find().populate('user'); // Populate user details
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

// READ: Search a giver by location, prefer pet or experience level
giverRouter.get('/search', async (req, res) => {
    try {
        const { address, petType, experience } = req.query;

        // Build a filter object based on available query parameters
        const filter = {};

        if (address) {
            filter.address = address;
        }
        if (pets_type) {
            filter.pets_type = pets_type; // Adjust to match the field name in the Giver schema
        }
        if (experience) {
            filter.experience = experience; // Adjust to match the field name in the Giver schema
        }

        // Perform the search with the filter
        const givers = await Giver.find(filter)
            .populate('user'); // Uncomment to populate user details if needed

        res.status(200).json(givers);
    } catch (error) {
        console.error('Error fetching givers:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


// UPDATE: Update a giver
giverRouter.put('/:id', middleware.tokenExtractor, async (req, res) => {
    const { id } = req.params;
    const { name, address, description, experience, pets_type, image } = req.body;

    try {
        const giver = await Giver.findById(id);
        if (!giver) {
            return res.status(404).json({ message: 'Giver not found.' });
        }

        // Update only the fields provided
        if (name) giver.name = name;
        if (address) giver.address = address;
        if (description) giver.description = description;
        if (experience) giver.experience = experience;
        if (pets_type) giver.pets_type = pets_type;
        if (image) giver.image = image;

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
