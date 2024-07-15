// routes/productRoutes.js
const express = require('express');
const { getProducts, importProducts, getFlashSalesProducts } = require('../controllers/productController');

const router = express.Router();

router.route('/').get(getProducts);
router.route('/import').post(importProducts);
router.route('/flash-sales').get(getFlashSalesProducts);

module.exports = router;
