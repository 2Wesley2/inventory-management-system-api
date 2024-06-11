const express = require('express');
const { createCustomerOrder, getCustomerOrderStatus } = require('../controllers/customerOrderController');
const router = express.Router();

router.post('/create', createCustomerOrder);
router.get('/status/:id', getCustomerOrderStatus);

module.exports = router;
