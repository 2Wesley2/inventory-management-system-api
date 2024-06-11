const request = require('supertest');
const { app, server } = require('../app');
const mongoose = require('mongoose');
const Category = require('../models/Category');

describe('Category Management', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    await Category.deleteMany({});
  });

  it('should add a new category', async () => {
    const res = await request(app)
      .post('/api/categories/add')
      .send({
        name: 'Test Category',
        description: 'This is a test category',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Category added successfully');
  });

  it('should edit an existing category', async () => {
    const category = new Category({
      name: 'Test Category',
      description: 'This is a test category',
    });
    await category.save();

    const res = await request(app)
      .put(`/api/categories/edit/${category._id}`)
      .send({ description: 'Updated description' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Category updated successfully');
    expect(res.body.category.description).toEqual('Updated description');
  });

  it('should delete an existing category', async () => {
    const category = new Category({
      name: 'Test Category',
      description: 'This is a test category',
    });
    await category.save();

    const res = await request(app)
      .delete(`/api/categories/delete/${category._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Category deleted successfully');
  });

  it('should list all categories', async () => {
    const category1 = new Category({
      name: 'Test Category 1',
      description: 'This is a test category 1',
    });
    const category2 = new Category({
      name: 'Test Category 2',
      description: 'This is a test category 2',
    });
    await category1.save();
    await category2.save();

    const res = await request(app)
      .get('/api/categories/list');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(2);
  });
});
