const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  number: { type: String, required: true },
  dateIssued: { type: Date, default: Date.now },
  totalAmount: { type: Number, required: true },
  customerOrderId: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomerOrder', required: true },
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
