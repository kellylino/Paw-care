const mongoose = require('mongoose')

const petSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    breed: { type: String },
    photos: { type: [String] },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Owner',
      required: true,
    },
    attention: { type: String },
    age: { type: String },
    gender: { type: String },
    characteristic: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pet', petSchema);

