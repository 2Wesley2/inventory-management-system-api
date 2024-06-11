const express = require('express');
const { registerProductMovement } = require('../controllers/productMovementController');
const router = express.Router();

router.post('/register', registerProductMovement);

module.exports = router;
