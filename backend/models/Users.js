const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    roles: { type: [String],  default: []}, // Allow multiple roles
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
