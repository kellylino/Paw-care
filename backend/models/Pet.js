const mongoose = require('mongoose')

const petSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    breed: { type: String },
    age: { type: String },
    gender: { type: String },
    attention: { type: String },
    characteristic: { type: String },
    image: { type: [String] },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Owner',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pet', petSchema);

