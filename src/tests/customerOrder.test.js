const request = require('supertest');
const { app, server } = require('../app');
const mongoose = require('mongoose');
const CustomerOrder = require('../models/CustomerOrder');
const Product = require('../models/Product');

describe('Customer Order Management', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    await CustomerOrder.deleteMany({});
    await Product.deleteMany({});
  });

  it('should create a new customer order', async () => {
    const product = new Product({
      name: 'Test Product',
      price: 100,
      quantity: 50,
      category: 'Test Category',
      supplier: 'Test Supplier',
    });
    await product.save();

    const res = await request(app)
      .post('/api/customer-orders/create')
      .send({
        items: [{
          productId: product._id,
          quantity: 20,
        }],
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Customer order created successfully');
  });

  it('should not create a customer order with insufficient stock', async () => {
    const product = new Product({
      name: 'Test Product',
      price: 100,
      quantity: 10,
      category: 'Test Category',
      supplier: 'Test Supplier',
    });
    await product.save();

    const res = await request(app)
      .post('/api/customer-orders/create')
      .send({
        items: [{
          productId: product._id,
          quantity: 20,
        }],
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Insufficient stock for product Test Product');
  });

  it('should get the status of an existing customer order', async () => {
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
      .get(`/api/customer-orders/status/${customerOrder._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'Pending');
  });

  it('should reduce the product stock when a customer order is created', async () => {
    const product = new Product({
      name: 'Test Product',
      price: 100,
      quantity: 50,
      category: 'Test Category',
      supplier: 'Test Supplier',
    });
    await product.save();

    await request(app)
      .post('/api/customer-orders/create')
      .send({
        items: [{
          productId: product._id,
          quantity: 20,
        }],
      });

    const updatedProduct = await Product.findById(product._id);
    expect(updatedProduct.quantity).toEqual(30);
  });
});
