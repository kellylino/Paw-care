const mongoose = require('mongoose')

const ownerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Owner', ownerSchema);

