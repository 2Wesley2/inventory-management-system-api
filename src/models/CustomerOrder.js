const mongoose = require('mongoose');

const customerOrderSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
  }],
});

const CustomerOrder = mongoose.model('CustomerOrder', customerOrderSchema);

module.exports = CustomerOrder;
