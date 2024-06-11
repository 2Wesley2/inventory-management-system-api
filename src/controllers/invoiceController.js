const Invoice = require('../models/Invoice');
const CustomerOrder = require('../models/CustomerOrder');

const issueInvoice = async (req, res) => {
  const { customerOrderId } = req.body;
  try {
    const customerOrder = await CustomerOrder.findById(customerOrderId).populate('items.productId');
    if (!customerOrder) {
      return res.status(404).json({ error: 'Customer order not found' });
    }

    const totalAmount = customerOrder.items.reduce((total, item) => {
      return total + (item.quantity * item.productId.price);
    }, 0);

    const invoice = new Invoice({
      number: `INV-${Date.now()}`,
      totalAmount,
      customerOrderId,
    });
    await invoice.save();
    res.status(201).json({ message: 'Invoice issued successfully', invoice });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getInvoice = async (req, res) => {
  const { id } = req.params;
  try {
    const invoice = await Invoice.findById(id).populate('customerOrderId', 'items');
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.status(200).json(invoice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { issueInvoice, getInvoice };
