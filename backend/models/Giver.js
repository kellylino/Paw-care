import mongoose from 'mongoose';

const giverSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String },
    experience_year: { type: String },
    description: { type: String },
    address: { type: String },
    feedback: { type: String },
    pets_type: { type: [String] }, // Array of pet types
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Giver = mongoose.model('Giver', giverSchema);

export default Giver;
