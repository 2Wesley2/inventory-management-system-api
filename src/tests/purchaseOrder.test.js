const request = require('supertest');
const { app, server } = require('../app');
const mongoose = require('mongoose');
const PurchaseOrder = require('../models/PurchaseOrder');
const Product = require('../models/Product');

describe('Purchase Order Management', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    await PurchaseOrder.deleteMany({});
    await Product.deleteMany({});
  });

  it('should create a new purchase order', async () => {
    const product = new Product({
      name: 'Test Product',
      price: 100,
      quantity: 50,
      category: 'Test Category',
      supplier: 'Test Supplier',
    });
    await product.save();

    const res = await request(app)
      .post('/api/purchase-orders/create')
      .send({
        items: [{
          productId: product._id,
          quantity: 20,
        }],
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Purchase order created successfully');
  });

  it('should get the status of an existing purchase order', async () => {
    const product = new Product({
      name: 'Test Product',
      price: 100,
      quantity: 50,
      category: 'Test Category',
      supplier: 'Test Supplier',
    });
    await product.save();

    const purchaseOrder = new PurchaseOrder({
      items: [{
        productId: product._id,
        quantity: 20,
      }],
    });
    await purchaseOrder.save();

    const res = await request(app)
      .get(`/api/purchase-orders/status/${purchaseOrder._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'Pending');
  });
});
