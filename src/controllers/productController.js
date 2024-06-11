const Product = require('../models/Product');

const addProduct = async (req, res) => {
  const { name, price, quantity, category, supplier } = req.body;
  try {
    const product = new Product({ name, price, quantity, category, supplier });
    await product.save();
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const searchProducts = async (req, res) => {
  const { type, value } = req.query;
  try {
    let products;
    switch (type) {
      case 'name':
        products = await Product.findByName(value);
        break;
      case 'category':
        products = await Product.findByCategory(value);
        break;
      case 'supplier':
        products = await Product.findBySupplier(value);
        break;
      case 'quantity':
        products = await Product.findByQuantity(parseInt(value));
        break;
      case 'date':
        products = await Product.findByDate(value);
        break;
      default:
        return res.status(400).json({ error: 'Invalid search type' });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addProduct, editProduct, deleteProduct, listProducts, searchProducts };
