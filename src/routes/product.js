const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductController');
const {requireAuth} = require('../middleware/authMiddleware');
//điền trên url: /localhost:/product/detail/:slug
router.get('/detail/:slug', requireAuth, productController.detail);
router.get('/search', productController.search);
router.get('/cart', productController.cart);
router.get('/add-to-cart/:id', productController.addToCart);
router.get('/checkout', productController.checkout);
router.post('/checkout', productController.post_checkout);
router.get('/remove/:id', productController.remove);
router.get('/reduce/:id', productController.reduce);
router.get('/increase/:id', productController.increase);
module.exports = router;