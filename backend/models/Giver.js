const mongoose = require('mongoose')

const giverSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String },
    description: { type: String },
    experience: { type: String },
    pets_type: { type: [String] }, // Array of pet types
    image: { type: String }, // Field to store image URL or path
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Giver', giverSchema);

