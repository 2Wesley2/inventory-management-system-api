const Employee = require('../models/Employee');
const bcrypt = require('bcrypt');

const addEmployee = async (req, res) => {
  const { name, email, password, role, permissions } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = new Employee({ name, email, password: hashedPassword, role, permissions });
    await employee.save();
    res.status(201).json({ message: 'Employee added successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editEmployee = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    const employee = await Employee.findByIdAndUpdate(id, updates, { new: true });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee updated successfully', employee });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addEmployee, editEmployee, deleteEmployee, listEmployees };
