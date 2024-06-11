const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  dateAdded: { type: Date, default: Date.now },
  category: { type: String, required: true },
  supplier: { type: String, required: true },
});

productSchema.statics.findByCategory = function (category) {
  return this.find({ category });
};

productSchema.statics.findBySupplier = function (supplier) {
  return this.find({ supplier });
};

productSchema.statics.findByName = function (name) {
  return this.find({ name: new RegExp(name, 'i') });
};

productSchema.statics.findByQuantity = function (quantity) {
  return this.find({ quantity: { $gte: quantity } });
};

productSchema.statics.findByDate = function (date) {
  return this.find({ dateAdded: { $gte: new Date(date) } });
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
