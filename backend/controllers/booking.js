const Booking = require('../models/Booking');
const Owner = require('../models/Owner')
const User = require('../models/User')
const middleware = require('../utils/middleware')
const bookingRouter = require('express').Router()

// **Create Booking from giver view**
bookingRouter.post('/giver', middleware.tokenExtractor, async (req, res) => {
    const {username, pet_name, date, status } = req.body;

    // find owner account user ID by username
    const ownerUserID = await User.findOne({ username }).select('_id');

    // get the onwer ID by user ID
    const owner = await Owner.findOne({ user: ownerUserID }).select('_id');

    // get the giver ID from token
    const giver = await Owner.findOne({ user: req.user_id }).select('_id');

    try {
        const newBooking= new Booking({
            giver,
            owner,
            pet_name,
            date,
            status,
        });
      await newBooking.save();
      res.status(201).json(newBooking);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

// **Create Booking from owner view**
bookingRouter.post('/owner', middleware.tokenExtractor, async (req, res) => {
    const {username, pet_name, date, status } = req.body;

    // find giver account user ID by username
    const ownerUserID = await User.findOne({ username }).select('_id');

    // get the giver ID by user ID
    const giver = await Owner.findOne({ user: ownerUserID }).select('_id');

    // get the owner ID from token
    const owner = await Owner.findOne({ user: req.user_id }).select('_id');

    try {
        const newBooking= new Booking({
            giver,
            owner,
            pet_name,
            date,
            status,
        });
      await newBooking.save();
      res.status(201).json(newBooking);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

// **Get All Bookings**
bookingRouter.get('/', async (req, res) => {
    try {
      const bookings = await Booking.find().populate('owner giver');
      res.status(200).json(bookings);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// **Get Booking by ID**
bookingRouter.get('/:id', async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id).populate('owner giver');
      if (!booking) return res.status(404).json({ error: 'Booking not found' });
      res.status(200).json(booking);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// **Update Booking**
bookingRouter.put('/:id', async (req, res) => {
    try {
      const { status } = req.body;

      // Validate that `status` is provided
      if (!status) {
        return res.status(400).json({ error: 'Status is required' });
      }

      // Update the status field
      const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        { status },
        {
          new: true, // Return the updated document
          runValidators: true, // Ensure the new value adheres to schema validation
        }
      );

      // Check if booking exists
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      // Send the updated booking as a response
      res.status(200).json(booking);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });


// **Delete Booking**
bookingRouter.delete('/:id', async (req, res) => {
    try {
      const booking = await Booking.findByIdAndDelete(req.params.id);
      if (!booking) return res.status(404).json({ error: 'Booking not found' });
      res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = bookingRouter