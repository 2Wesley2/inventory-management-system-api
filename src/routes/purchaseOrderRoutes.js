const express = require('express');
const { createPurchaseOrder, getPurchaseOrderStatus } = require('../controllers/purchaseOrderController');
const router = express.Router();

router.post('/create', createPurchaseOrder);
router.get('/status/:id', getPurchaseOrderStatus);

module.exports = router;
