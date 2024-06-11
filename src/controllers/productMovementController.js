const ProductMovement = require('../models/ProductMovement');
const Product = require('../models/Product');

const registerProductMovement = async (req, res) => {
  const { productId, type, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (type === 'out' && product.quantity < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    const productMovement = new ProductMovement({ productId, type, quantity });
    await productMovement.save();

    if (type === 'out') {
      product.quantity -= quantity;
    } else if (type === 'in') {
      product.quantity += quantity;
    }

    await product.save();

    res.status(201).json({ message: 'Product movement registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registerProductMovement };
