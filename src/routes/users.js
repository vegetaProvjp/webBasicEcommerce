// const express = require("express");
// const router = express.Router();
// const usersController = require("../app/controllers/usersController");
// const passport = require("passport");

// //router.get('/secret',isLoggedIn, usersController.secret);
// router.get("/secret", usersController.secret);
// router.get("/signup", usersController.signup);
// router.post("/signup", usersController.post_signup);
// router.get("/login", usersController.login);
// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/users/secret",
//     failureRedirect: "/users/login",
//   }),
//   usersController.post_login
// );

// router.get("/logout", function (req, res) {
//   req.session.destroy(function (err) {
//     res.redirect("/"); //Inside a callback… bulletproof!
//   });
// });

// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated()) return next();
//   res.redirect("/users/login");
// }
// module.exports = router;
