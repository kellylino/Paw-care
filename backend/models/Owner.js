import mongoose from 'mongoose';

const ownerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String },
    feedback: { type: String },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Owner = mongoose.model('Owner', ownerSchema);

export default Owner;
