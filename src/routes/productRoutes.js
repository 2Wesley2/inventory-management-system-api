const express = require('express');
const { addProduct, editProduct, deleteProduct, listProducts, searchProducts } = require('../controllers/productController');
const router = express.Router();

router.post('/add', addProduct);
router.put('/edit/:id', editProduct);
router.delete('/delete/:id', deleteProduct);
router.get('/list', listProducts);
router.get('/search', searchProducts);

module.exports = router;
