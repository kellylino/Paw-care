import mongoose from 'mongoose';

const aiRecommendationSchema = new mongoose.Schema({
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    required: true,
  },
  recommended_giver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Giver',
    required: true,
  },
  criteria: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const AiRecommendation = mongoose.model(
  'AiRecommendation',
  aiRecommendationSchema
);

export default AiRecommendation;
