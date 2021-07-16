// const { multipleMongooseToObject } = require("../../util/mongoose");
// const Users = require("../models/Users");
// const passport = require("passport");
// const express = require("express");

// class UsersController {
//   signup(req, res) {
//     res.render("user/signup", { layout: false });
//   }

//   //[POST] /user/information
//   post_signup(req, res, next) {
//     var username = req.body.username;
//     var password = req.body.password;
//     Users.register(
//       new Users({ username: username }),
//       password,
//       function (err, user) {
//         if (err) {
//           console.log(err);
//           return res.render("user/signup");
//         }

//         passport.authenticate("local")(req, res, function () {
//           res.render("user/secret");
//         });
//       }
//     );
//   }

//   secret(req, res, next) {
//     res.render("user/secret");
//   }

//   login(req, res) {
//     res.render("user/login", { layout: false });
//   }

//   post_login(req, res) {
    
//   }
// }

// module.exports = new UsersController();
