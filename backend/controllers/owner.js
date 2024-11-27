const Owner = require('../models/Owner');
const User = require('../models/Users')
const middleware = require('../utils/middleware')
const ownerRouter = require('express').Router()

ownerRouter.post('/', middleware.tokenExtractor, async (req, res) => {
    try {
        const { name, address } = req.body;

        const updatedUser = await User.findById(req.user_id);

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Ensure roles is initialized as an array if it is null or undefined
        if (!Array.isArray(updatedUser.roles)) {
            updatedUser.roles = [];
        }

        // Add the role to the array if it's not already present
        if (!updatedUser.roles.includes('owner')) {
            updatedUser.roles.push('owner');
        }

        // Save the updated user document
        await updatedUser.save();

        const newOwner = new Owner({
            name,
            address,
            user: req.user_id,
        });

        await newOwner.save();
        return res.status(201).json({ message: 'Owner added successfully.', owner: newOwner });
    } catch (error) {
        console.error('Error adding owner:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});


// READ: Get all owners
ownerRouter.get('/', async (req, res) => {
    try {
        const owners = await Owner.find();
        //const owners = await Owner.find().populate('user'); // Populate user details
        res.status(200).json(owners);
    } catch (error) {
        console.error('Error fetching owners:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// READ: Get an owner by ID
ownerRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const owner = await Owner.findById(id);
        //const owner = await Owner.findById(id).populate('user');
        if (!owner) {
            return res.status(404).json({ message: 'Owner not found.' });
        }
        res.status(200).json(owner);
    } catch (error) {
        console.error('Error fetching owner:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// READ: Get an owner by name
ownerRouter.get('/:name', async (req, res) => {
    const { name } = req.params;

    try {
        const owner = await Owner.findOne({ name: name });
        //const owner = await Owner.findOne({ name: name }).populate('user');
        if (!owner) {
            return res.status(404).json({ message: 'Owner not found.' });
        }
        res.status(200).json(owner);
    } catch (error) {
        console.error('Error fetching owner:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// UPDATE: Update an owner
ownerRouter.put('/:id', middleware.tokenExtractor, async (req, res) => {
    const { id } = req.params;
    const { name, address } = req.body;

    try {
        const owner = await Owner.findById(id);
        if (!owner) {
            return res.status(404).json({ message: 'Owner not found.' });
        }

        if (name) owner.name = name;
        if (address) owner.address = address;

        await owner.save();
        res.status(200).json({ message: 'Owner updated successfully.', owner });
    } catch (error) {
        console.error('Error updating owner:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// DELETE: Delete an owner
ownerRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const owner = await Owner.findByIdAndDelete(id);
        if (!owner) {
            return res.status(404).json({ message: 'Owner not found.' });
        }
        res.status(200).json({ message: 'Owner deleted successfully.' });
    } catch (error) {
        console.error('Error deleting owner:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = ownerRouter