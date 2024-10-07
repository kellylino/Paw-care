const mongoose = require('mongoose')

const giverSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String },
    experience_year: { type: String },
    description: { type: String },
    address: { type: String },
    pets_type: { type: [String] }, // Array of pet types
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Giver', giverSchema);

