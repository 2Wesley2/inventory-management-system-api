const express = require('express');
const { addCategory, editCategory, deleteCategory, listCategories } = require('../controllers/categoryController');
const router = express.Router();

router.post('/add', addCategory);
router.put('/edit/:id', editCategory);
router.delete('/delete/:id', deleteCategory);
router.get('/list', listCategories);

module.exports = router;
