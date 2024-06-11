const express = require('express');
const { addEmployee, editEmployee, deleteEmployee, listEmployees } = require('../controllers/employeeController');
const router = express.Router();

router.post('/add', addEmployee);
router.put('/edit/:id', editEmployee);
router.delete('/delete/:id', deleteEmployee);
router.get('/list', listEmployees);

module.exports = router;
