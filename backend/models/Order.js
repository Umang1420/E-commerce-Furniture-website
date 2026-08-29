const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  customer: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zip: String
  },

  products: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  paymentMethod: {
    type: String,
    default: 'demo'
  },

  paymentStatus: {
    type: String,
    default: 'pending'
  },

  transactionId: {
    type: String
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);