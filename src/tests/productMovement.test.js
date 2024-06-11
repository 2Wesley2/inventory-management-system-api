const request = require('supertest');
const { app, server } = require('../app');
const mongoose = require('mongoose');
const ProductMovement = require('../models/ProductMovement');
const Product = require('../models/Product');

describe('Product Movement Management', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    await ProductMovement.deleteMany({});
    await Product.deleteMany({});
  });

  it('should register a product movement (out)', async () => {
    const product = new Product({
      name: 'Test Product',
      price: 100,
      quantity: 50,
      category: 'Test Category',
      supplier: 'Test Supplier',
    });
    await product.save();

    const res = await request(app)
      .post('/api/product-movements/register')
      .send({
        productId: product._id,
        type: 'out',
        quantity: 20,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Product movement registered successfully');

    const updatedProduct = await Product.findById(product._id);
    expect(updatedProduct.quantity).toEqual(30);
  });

  it('should not register a product movement with insufficient stock', async () => {
    const product = new Product({
      name: 'Test Product',
      price: 100,
      quantity: 10,
      category: 'Test Category',
      supplier: 'Test Supplier',
    });
    await product.save();

    const res = await request(app)
      .post('/api/product-movements/register')
      .send({
        productId: product._id,
        type: 'out',
        quantity: 20,
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Insufficient stock');
  });

  it('should register a product movement (in)', async () => {
    const product = new Product({
      name: 'Test Product',
      price: 100,
      quantity: 50,
      category: 'Test Category',
      supplier: 'Test Supplier',
    });
    await product.save();

    const res = await request(app)
      .post('/api/product-movements/register')
      .send({
        productId: product._id,
        type: 'in',
        quantity: 20,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Product movement registered successfully');

    const updatedProduct = await Product.findById(product._id);
    expect(updatedProduct.quantity).toEqual(70);
  });
});
