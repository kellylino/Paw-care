const Pet = require('../models/Pet');
const Owner = require('../models/Owner')
const middleware = require('../utils/middleware')
const petRouter = require('express').Router()

// CREATE: Add a new pet
petRouter.post('/', middleware.tokenExtractor, async (req, res) => {
    const { name, breed, photos, attention, age, gender, characteristic } = req.body;

    const owner = await Owner.findOne({ user: req.user_id }).select('_id');

    try {
        const newPet = new Pet({
            name,
            breed,
            photos,
            attention,
            age,
            gender,
            characteristic,
            owner: owner
        });

        await newPet.save();
        res.status(201).json({ message: 'Pet added successfully.', pet: newPet });
    } catch (error) {
        console.error('Error adding pet:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// READ: Get all pets
petRouter.get('/', async (req, res) => {
    try {
        const pets = await Pet.find().populate('owner'); // Populate user details
        res.status(200).json(pets);
    } catch (error) {
        console.error('Error fetching pets:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// READ: Get a pet by ID
petRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const pet = await Pet.findById(id).populate('owner');
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found.' });
        }
        res.status(200).json(pet);
    } catch (error) {
        console.error('Error fetching pet:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// READ: Get a pet by name
petRouter.get('/:name', async (req, res) => {
    const { name } = req.params;

    try {
        // Use findOne to search by the 'name' field
        const pet = await Pet.findOne({ name: name }).populate('owner');
        if (!pet) {
            return res.status(404).json({ message: 'Giver not found.' });
        }
        res.status(200).json(pet);
    } catch (error) {
        console.error('Error fetching givpeterpet:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


// UPDATE: Update a pet
petRouter.put('/:id', middleware.tokenExtractor, async (req, res) => {
    const { id } = req.params;
    const { name, breed, photos, attention, age, gender, characteristic } = req.body;

    try {
        const pet = await Pet.findById(id);
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found.' });
        }

        // Update only the fields provided
        if (name) pet.name = name;
        if (breed) pet.breed = breed;
        if (photos) pet.photos = photos;
        if (attention) pet.attention = attention;
        if (age) pet.age = age;
        if (gender) pet.gender = gender;
        if (characteristic) pet.characteristic = characteristic;

        await pet.save();
        res.status(200).json({ message: 'Pet updated successfully.', pet });
    } catch (error) {
        console.error('Error updating pet:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// DELETE: Delete a pet
petRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const pet = await Pet.findByIdAndDelete(id);
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found.' });
        }
        res.status(200).json({ message: 'Pet deleted successfully.' });
    } catch (error) {
        console.error('Error deleting pet:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = petRouter
