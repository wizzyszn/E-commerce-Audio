const express = require('express');
const { createProduct, getProducts, getProduct } = require('../controllers/productController');
const router = express.Router();

router.get('/', getProducts);
router.post('/create', createProduct);
router.get('/find/:id', getProduct);


module.exports = router;