import mongoose from 'mongoose';

const receiptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // 🔗 references the user who checked out
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  total: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Receipt = mongoose.model('Receipt', receiptSchema);
export default Receipt;
