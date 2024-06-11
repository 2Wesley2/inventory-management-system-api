const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
  }],
});

const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);

module.exports = PurchaseOrder;
