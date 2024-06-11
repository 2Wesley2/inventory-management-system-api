const mongoose = require('mongoose');

const productMovementSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  type: { type: String, enum: ['in', 'out'], required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const ProductMovement = mongoose.model('ProductMovement', productMovementSchema);

module.exports = ProductMovement;
