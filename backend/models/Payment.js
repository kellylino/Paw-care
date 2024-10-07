const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    required: true,
  },
  giver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Giver',
    required: true,
  },
  amount: { type: Number, required: true },
  payment_status: {
    type: String,
    enum: ['Pending', 'Completed', 'Refunded'],
    required: true,
  },
  payment_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payment', paymentSchema);
