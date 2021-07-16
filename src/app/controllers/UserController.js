const { multipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");
const jwt = require("jsonwebtoken");
const userinfo = require("../../util/userinfo");
const User = require("../models/User");
const path = require("path");
const maxAge = 3 * 24 * 60 * 60; //Thời gian sống của cookie
const Order = require("../models/Order");
var Cart = require("../models/cart");
const dirupload = path.join(
  __dirname,
  "..",
  "..",
  "public",
  "upload",
  "avatar"
);
const bcrypt = require("bcrypt");

class UserController {
  // login(req, res) {
  //   res.render("user/login", { layout: false });
  // }

  // signup(req, res) {
  //   res.render("user/signup", { layout: false });
  // }

  // //[POST] /user/signup
  // post_signup(req, res, next) {
  //   var avatar = req.files.avatar;
  //   var fileName = avatar.name;
  //   avatar.mv(`${dirUpload}/${fileName}`, (err) => {
  //     console.log(err);
  //   });
  //   var password = req.body.password;
  //   var infoUser = new User({
  //     username: req.body.username,
  //     fullName: req.body.fullName,
  //     email: req.body.email,
  //     phone: req.body.phone,
  //     address: req.body.address,
  //     avatar: `${fileName}`,
  //   });

  //   User.register(infoUser, password, function (err, user) {
  //     if (err) {
  //       console.log(err);
  //       return res.render("user/signup");
  //     }

  //     passport.authenticate("local")(req, res, function () {
  //       res.render("user/secret", {
  //         user: req.user,
  //       });

  //     });
  //   });
  // }

  // secret(req, res, next) {
  //   res.render("user/secret");
  // }

  // post_login(req, res) {}
  // //GET /user/detail
  // detail(req, res, next) {
  //   let userID = req.user.id;
  //   User.findById(userID)
  //     .then((user) => {

  //       res.render("user/detail", {
  //         user: mongooseToObject(user),
  //       });
  //     })
  //     .catch(next);
  // }
  //[GET] /user/login
  login(req, res) {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, "my secret key", (err, decodedToken) => {
        if (err) {
          res.render("user/login", { layout: false });
        } else {
          // console.log(decodedToken);
          res.render("user/logged");
        }
      });
    } else {
      res.render("user/login", { layout: false });
    }
  }
  async post_login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await User.login(username, password);
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      // res.status(201).json({ user: user._id });
      res.redirect("/");
      req.app.locals.login = true;
    } catch (error) {
      res.status(400).json({ error: "Tài khoản hoặc mật khẩu không đúng" });
    }
  }
  //[GET] /user/signup
  signup(req, res) {
    res.render("user/signup", { layout: false });
  }

  //[POST] /user/signup
  post_signup(req, res) {
    if (req.files.avatar) {
      let avatar = req.files.avatar;
      let filename = avatar.name;
      avatar.mv(`${dirupload}/${filename}`, (err) => {
        console.log(err);
      });
      User.create({
        username: req.body.username,
        password: req.body.password,
        fullName: req.body.fullName,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        avatar: `${filename}`,
      })
        .then(
          res.render("user/signup", {
            layout: false,
            data: {
              success: "Signup Successfully",
            },
          })
        )
        .catch((err) => {
          res.render("user/signup", {
            layout: false,
            data: {
              error: "Signup Successfully!",
            },
          });
        });
    } else {
      User.create({
        username: req.body.username,
        password: req.body.password,
        fullName: req.body.fullName,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
      })
        .then(
          res.render("/user/signup", {
            layout: false,
            success: "Tạo tài khoản mới thành công!",
          })
        )
        .catch((err) => {
          res.render("/user/signup", {
            layout: false,
            error: "Tạo tài khoản mới thành công!",
          });
        });
    }
  }

  //GET /user/logged
  logged(req, res, next) {
    res.render("user/logged");
  }

  //[GET] /user/logout
  logout(req, res) {
    req.app.locals.login = false;
    res.clearCookie("jwt");
    res.redirect("/");
  }
  //[GET] /user/detail
  detail(req, res, next) {
    let userID = res.locals.user.id;
    User.findById(userID)
      .then((user) => {
        res.render(
          "user/detail"
          // , {user: mongooseToObject(user),}
        );
      })
      .catch(next);
  }

  // [POST] /user/profile/updateProfile
  async updateProfile(req, res) {
    let userID = userinfo(req);
    var rs = await User.updateOne(
      { _id: userID },
      {
        $set: {
          fullName: req.body.fullName,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
        },
      }
    );
    if (rs) {
      res.status(200).json({ success: "Cập nhật thành công" });
    } else {
      res.status(400).json({ error: "Cập nhật thất bại" });
    }
  }

  //[POST] /user/profile/updateAvatar
  updateAvatar(req, res) {
    let userID = userinfo(req);
    let avatar = {};
    if (req.files) {
      let ava = req.files.avatar;
      let filename = ava.name;
      avatar.avatar = filename;
      ava.mv(`${dirupload}/${filename}`, (err) => {
        console.log(err);
      });
    }
    User.findOneAndUpdate({ _id: userID }, avatar, (err) => {
      if (err) console.log(err);
      else res.redirect("back");
    });
  }

  //[POST] /user/profile/updatePass
  async updatePass(req, res) {
    let userID = userinfo(req);
    const salt = await bcrypt.genSalt();
    let password = await bcrypt.hash(req.body.password, salt);
    let rs = await User.updateOne(
      { _id: userID },
      {
        $set: {
          password: password,
        },
      }
    );
    if (rs) {
      res.status(200).json({ success: "Cập nhật thành công" });
    } else {
      res.status(400).json({ error: "Cập nhật thất bại" });
    }
  }

  //[GET] /user/secret
  secret(req, res, next) {
    res.render("user/secret");
  }

  //[GET] /user/profile
  async profile(req, res) {
    let userID = userinfo(req);
    User.findById(userID)
      .then((user) =>
        res.render("user/profile", {
          user: mongooseToObject(user),
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }

  purchase(req, res) {
    let userID = userinfo(req);
    Order.find(
      {
        user: userID,
      },
      function (err, orders) {
        if (err) {
          return res.write("Error!");
        }
        var cart;
        orders.forEach(function (order) {
          cart = new Cart(order.cart);
          order.items = cart.generateArray();
        });
        res.render("user/purchase", {
          orders:  orders,
          user: userID,
        });
      }
    ).lean().sort({ createdAt: -1 });
  }
}
//Hàm sinh token
const createToken = (id) => {
  return jwt.sign({ id }, "my secret key", {
    expiresIn: maxAge,
  });
};
module.exports = new UserController();
