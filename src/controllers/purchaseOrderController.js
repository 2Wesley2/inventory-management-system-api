const PurchaseOrder = require('../models/PurchaseOrder');
const Product = require('../models/Product');

const createPurchaseOrder = async (req, res) => {
  const { items } = req.body;
  try {
    const purchaseOrder = new PurchaseOrder({ items });
    await purchaseOrder.save();
    res.status(201).json({ message: 'Purchase order created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPurchaseOrderStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const purchaseOrder = await PurchaseOrder.findById(id).populate('items.productId', 'name');
    if (!purchaseOrder) {
      return res.status(404).json({ error: 'Purchase order not found' });
    }
    res.status(200).json(purchaseOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createPurchaseOrder, getPurchaseOrderStatus };
