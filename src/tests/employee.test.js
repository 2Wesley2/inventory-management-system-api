const request = require('supertest');
const { app, server } = require('../app');
const mongoose = require('mongoose');
const Employee = require('../models/Employee');

describe('Employee Management', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    await Employee.deleteMany({});
  });

  it('should add a new employee', async () => {
    const res = await request(app)
      .post('/api/employees/add')
      .send({
        name: 'Test Employee',
        email: 'test.employee@example.com',
        password: 'password123',
        role: 'Manager',
        permissions: ['read', 'write'],
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Employee added successfully');
  });

  it('should edit an existing employee', async () => {
    const employee = new Employee({
      name: 'Test Employee',
      email: 'test.employee@example.com',
      password: 'password123',
      role: 'Manager',
      permissions: ['read', 'write'],
    });
    await employee.save();

    const res = await request(app)
      .put(`/api/employees/edit/${employee._id}`)
      .send({ role: 'Supervisor' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Employee updated successfully');
    expect(res.body.employee.role).toEqual('Supervisor');
  });

  it('should delete an existing employee', async () => {
    const employee = new Employee({
      name: 'Test Employee',
      email: 'test.employee@example.com',
      password: 'password123',
      role: 'Manager',
      permissions: ['read', 'write'],
    });
    await employee.save();

    const res = await request(app)
      .delete(`/api/employees/delete/${employee._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Employee deleted successfully');
  });

  it('should list all employees', async () => {
    const employee1 = new Employee({
      name: 'Test Employee 1',
      email: 'test.employee1@example.com',
      password: 'password123',
      role: 'Manager',
      permissions: ['read', 'write'],
    });
    const employee2 = new Employee({
      name: 'Test Employee 2',
      email: 'test.employee2@example.com',
      password: 'password123',
      role: 'Worker',
      permissions: ['read'],
    });
    await employee1.save();
    await employee2.save();

    const res = await request(app)
      .get('/api/employees/list');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(2);
  });
});
