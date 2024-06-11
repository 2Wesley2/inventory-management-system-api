const CustomerOrder = require('../models/CustomerOrder');
const Product = require('../models/Product');

const createCustomerOrder = async (req, res) => {
  const { items } = req.body;
  try {
    // Verifique se os produtos existem e se há estoque suficiente
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(400).json({ error: `Product with ID ${item.productId} not found` });
      }
      if (product.quantity < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for product ${product.name}` });
      }
    }

    // Atualize a quantidade de produtos no estoque
    for (const item of items) {
      await Product.findByIdAndUpdate(item.productId, { $inc: { quantity: -item.quantity } });
    }

    const customerOrder = new CustomerOrder({ items });
    await customerOrder.save();
    res.status(201).json({ message: 'Customer order created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCustomerOrderStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const customerOrder = await CustomerOrder.findById(id).populate('items.productId', 'name price');
    if (!customerOrder) {
      return res.status(404).json({ error: 'Customer order not found' });
    }
    res.status(200).json(customerOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createCustomerOrder, getCustomerOrderStatus };
