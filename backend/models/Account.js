import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

// Create the model
const Account = mongoose.model('Account', accountSchema);

export default Account;
