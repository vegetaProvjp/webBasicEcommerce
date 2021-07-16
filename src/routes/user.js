const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/userController");
const {requireAuth} = require('../middleware/authMiddleware');
const {isUser} = require('../middleware/isUser');

// router.get('/detail',isLoggedIn, userController.detail);
// router.get('/secret',isLoggedIn, userController.secret);
router.get('/detail',requireAuth, isUser, userController.detail);

router.get('/profile/:slug',requireAuth, isUser, userController.profile);
router.get('/purchase', requireAuth, isUser, userController.purchase);
router.post('/profile/updateProfile', requireAuth, isUser, userController.updateProfile);
router.post('/profile/updateAvatar', requireAuth, isUser, userController.updateAvatar);
router.post('/profile/updatePass', requireAuth, isUser, userController.updatePass);
router.get('/secret',requireAuth, isUser, userController.secret);
router.get("/signup", userController.signup);
// router.post("/signup", upload.single('avatar'), userController.post_signup);

router.post("/signup", userController.post_signup);
router.get("/login", userController.login);
router.post("/login",userController.post_login);
router.get('/logged', userController.logged);
router.get("/logout", requireAuth, isUser, userController.logout);

module.exports = router;
