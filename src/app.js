const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI);

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes')
const purchaseOrderRoutes = require('./routes/purchaseOrderRoutes');
const customerOrderRoutes = require('./routes/customerOrderRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const productMovementRoutes = require('./routes/productMovementRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes')
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/purchase-orders', purchaseOrderRoutes);
app.use('/api/customer-orders', customerOrderRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/product-movements', productMovementRoutes);
app.use('/api/invoices', invoiceRoutes);

app.get('/', (req, res) => {
  res.send('Inventory Management System');
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = { app, server };
