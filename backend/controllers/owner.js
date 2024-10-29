const Owner = require('../models/Owner');
const middleware = require('../utils/middleware')
const ownerRouter = require('express').Router()

ownerRouter.post('/', middleware.tokenExtractor, async (req, res) => {
    const { name, address } = req.body;

    try {
        const newOwner = new Owner({
            name,
            address,
            user: req.user_id, // Use user_id from token
        });

        await newOwner.save();
        res.status(201).json({ message: 'Owner added successfully.', owner: newOwner });
    } catch (error) {
        console.error('Error adding owner:', error);
        res.status(500).json({ message: 'Internal server error.' });
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