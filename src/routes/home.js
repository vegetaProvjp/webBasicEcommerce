const express = require('express');
const router = express.Router();
const homeControllers = require('../app/controllers/HomeController');
const {isUser} = require('../middleware/isUser');

router.get('/', homeControllers.index);
router.get('/search', homeControllers.search);

module.exports = router;