const request = require('supertest');
const { app, server } = require('../app');
const mongoose = require('mongoose');
const Product = require('../models/Product');

describe('Product Management', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    await Product.deleteMany({});
  });

  it('should add a new product', async () => {
    const res = await request(app)
      .post('/api/products/add')
      .send({
        name: 'Test Product',
        price: 100,
        quantity: 50,
        category: 'Test Category',
        supplier: 'Test Supplier',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Product added successfully');
  });

  it('should edit an existing product', async () => {
    const product = new Product({
      name: 'Test Product',
      price: 100,
      quantity: 50,
      category: 'Test Category',
      supplier: 'Test Supplier',
    });
    await product.save();

    const res = await request(app)
      .put(`/api/products/edit/${product._id}`)
      .send({ price: 150 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Product updated successfully');
    expect(res.body.product.price).toEqual(150);
  });

  it('should delete an existing product', async () => {
    const product = new Product({
      name: 'Test Product',
      price: 100,
      quantity: 50,
      category: 'Test Category',
      supplier: 'Test Supplier',
    });
    await product.save();

    const res = await request(app)
      .delete(`/api/products/delete/${product._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Product deleted successfully');
  });

  it('should list all products', async () => {
    const product1 = new Product({
      name: 'Test Product 1',
      price: 100,
      quantity: 50,
      category: 'Test Category',
      supplier: 'Test Supplier',
    });
    const product2 = new Product({
      name: 'Test Product 2',
      price: 200,
      quantity: 30,
      category: 'Another Category',
      supplier: 'Another Supplier',
    });
    await product1.save();
    await product2.save();

    const res = await request(app)
      .get('/api/products/list');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(2);
  });

  it('should search products by name', async () => {
    const product = new Product({
      name: 'Unique Test Product',
      price: 100,
      quantity: 50,
      category: 'Test Category',
      supplier: 'Test Supplier',
    });
    await product.save();

    const res = await request(app)
      .get('/api/products/search')
      .query({ type: 'name', value: 'Unique Test Product' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
    expect(res.body[0].name).toEqual('Unique Test Product');
  });

  // Adicione mais testes para buscar por categoria, fornecedor, quantidade e data
});
