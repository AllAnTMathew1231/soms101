import mongoose from 'mongoose';

const salesOrderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  SP: {
    type: Number,
    required: true,
    min: 0
  },
  CP: {
    type: Number,
    required: true,
    min: 0
  },
  profit: {
    type: Number,
    required: true
  },
  profitPercentage: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Delivered'],
    default: 'Pending'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Calculate profit and profit percentage before saving
salesOrderSchema.pre('save', function(next) {
  this.profit = this.SP - this.CP;
  this.profitPercentage = this.SP > 0 ? (this.profit / this.SP) * 100 : 0;
  next();
});

export default mongoose.model('SalesOrder', salesOrderSchema);