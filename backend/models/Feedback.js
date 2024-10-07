const mongoose = require('mongoose')

const FeedbackSchema = new mongoose.Schema(
    {
      owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
      giver: { type: mongoose.Schema.Types.ObjectId, ref: 'Giver', required: true },
      star: { type: Number, min: 1, max: 5, required: true }, // Star rating from 1 to 5
      comment: { type: String }, // Feedback comment
      date: { type: Date, default: Date.now }, // Date feedback was given
    },
    { _id: false } // No need for a separate _id for feedback subdocuments
  );

module.exports = mongoose.model('Feedback', FeedbackSchema);