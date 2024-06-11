const request = require('supertest');
const { app, server } = require('../app');
const mongoose = require('mongoose');
const Invoice = require('../models/Invoice');
const CustomerOrder = require('../models/CustomerOrder');
const Product = require('../models/Product');

describe('Invoice Management', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    await Invoice.deleteMany({});
    await CustomerOrder.deleteMany({});
    await Product.deleteMany({});
  });

  it('should issue an invoice for a customer order', async () => {
    const product = new Product({
      name: 'Test Product',
      price: 100,
      quantity: 50,
      category: 'Test Category',
      supplier: 'Test Supplier',
    });
    await product.save();

    const customerOrder = new CustomerOrder({
      items: [{
        productId: product._id,
        quantity: 20,
      }],
    });
    await customerOrder.save();

    const res = await request(app)
      .post('/api/invoices/issue')
      .send({ customerOrderId: customerOrder._id });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Invoice issued successfully');
    expect(res.body.invoice).toHaveProperty('totalAmount', 2000);
  });

  it('should get an existing invoice', async () => {
    const product = new Product({
      name: 'Test Product',
      price: 100,
      quantity: 50,
      category: 'Test Category',
      supplier: 'Test Supplier',
    });
    await product.save();

    const customerOrder = new CustomerOrder({
      items: [{
        productId: product._id,
        quantity: 20,
      }],
    });
    await customerOrder.save();

    const invoice = new Invoice({
      number: 'INV-123456',
      totalAmount: 2000,
      customerOrderId: customerOrder._id,
    });
    await invoice.save();

    const res = await request(app)
      .get(`/api/invoices/${invoice._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('number', 'INV-123456');
  });
});
