const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    roles: { type: [String], enum: ['owner', 'giver'], default: null }, // Allow multiple roles
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
