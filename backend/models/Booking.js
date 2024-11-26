const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Owner',
      required: true,
    },
    giver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Giver',
      required: true,
    },
    pet_name: { type: String },
    date: { type: String },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Canceled'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);

