const express = require('express');
const router = express.Router();
const pageController = require('../app/controllers/PageController');
const {requireAuth} = require('../middleware/authMiddleware');
const {isUser} = require('../middleware/isUser');
router.get('/about',isUser, pageController.about);
router.get('/faq',isUser, pageController.faq);

module.exports = router;