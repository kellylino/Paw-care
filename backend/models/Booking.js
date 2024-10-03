import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
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
    date: { type: Date },
    start_time: { type: String },
    end_time: { type: String },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Canceled'],
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
