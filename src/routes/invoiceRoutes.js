const express = require('express');
const { issueInvoice, getInvoice } = require('../controllers/invoiceController');
const router = express.Router();

router.post('/issue', issueInvoice);
router.get('/:id', getInvoice);

module.exports = router;
