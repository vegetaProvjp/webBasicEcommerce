// const { mongooseToObject } = require("../../util/mongoose");
// const Product = require('../models/Product');

// class AdminController {
//     // [GET] /admin/create lay du lieu
//     create(req, res, next) {
//         Product.findOne({ slug: req.params.slug })
//           .then((product) => {
//             res.render("admin/create", { product: mongooseToObject(product) });

//           })
//           .catch(next);

//       }
//       //[POST]/admin/store them du lieu
// store(req, res, next) {
//   const product = new Product(req.body);
//   product
//     .save()
//     .then(() => res.redirect("/admin/store"))
//     .catch((error) => {});
//     res.send('Course saved!');
// }

// }

// module.exports = new AdminController();
const { multipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");
const Product = require("../models/Product");
const Admin = require("../models/Admin");
const Order = require("../models/Order");
const { getUser } = require("../../util/commonFunc");
const userinfo = require("../../util/userinfo");
const jwt = require("jsonwebtoken");
const path = require("path");
const dirupload = path.join(
  __dirname,
  "..",
  "..",
  "public",
  "upload",
  "imageProduct"
);
const bcrypt = require("bcrypt");
const maxAge = 3 * 24 * 60 * 60; //Thời gian sống của cookie
class AdminController {
  //[GET] /admin/login
  login(req, res) {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, "my secret key", (err, decodedToken) => {
        if (err) {
          res.render("admin/login", { layout: false });
        } else {
          // console.log(decodedToken);
          res.render("admin/logged");
        }
      });
    } else {
      res.render("admin/login", { layout: false });
    }
  }
  async post_login(req, res) {
    const { username, password } = req.body;

    try {
      const admin = await Admin.login(username, password);
      const token = createToken(admin._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      // res.status(201).json({ user: user._id });
      res.redirect("/admin/list");
      req.app.locals.login = true;
    } catch (error) {
      res.status(400).json({ error: "Tài khoản hoặc mật khẩu không đúng" });
    }
  }
  //[GET] /user/signup
  signup(req, res) {
    res.render("admin/signup", { layout: false });
  }

  //[POST] /user/signup
  post_signup(req, res) {
    if (req.files.avatar) {
      let avatar = req.files.avatar;
      let filename = avatar.name;
      avatar.mv(`${dirupload}/${filename}`, (err) => {
        console.log(err);
      });
      Admin.create({
        username: req.body.username,
        password: req.body.password,
        fullName: req.body.fullName,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        avatar: `${filename}`,
      })
        .then(
          res.render("admin/signup", {
            layout: false,
            data: {
              success: "Signup Successfully",
            },
          })
        )
        .catch((err) => {
          res.render("admin/signup", {
            layout: false,
            data: {
              error: "Signup Successfully!",
            },
          });
        });
    } else {
      Admin.create({
        username: req.body.username,
        password: req.body.password,
        fullName: req.body.fullName,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
      })
        .then(
          res.render("/admin/signup", {
            layout: false,
            success: "Tạo tài khoản mới thành công!",
          })
        )
        .catch((err) => {
          res.render("/admin/signup", {
            layout: false,
            error: "Tạo tài khoản mới thành công!",
          });
        });
    }
  }
  //[GET] /admin/logged
  logged(req, res, next) {
    res.render("admin/logged");
  }

  //[GET] /admin/logout
  logout(req, res) {
    req.app.locals.login = false;
    res.clearCookie("jwt");
    res.redirect("/");
  }
  // [GET] /admin/create lay du lieu
  create(req, res, next) {
    Product.findOne({
      slug: req.params.slug,
    })
      .then((product) => {
        res.render("admin/create", {
          product: mongooseToObject(product),
          layout: false,
        });
      })
      .catch(next);
  }

  //[POST] /admin/create
  // post_create(req, res) {
  //   let images = [];
  //   if (req.files.image) {
  //     const arr = req.files.image;
  //     if (Array.isArray(arr)) {
  //       const amount = arr.length;
  //       for (let i = 0; i < amount; i++) {
  //         images.push(arr[i]["name"]);
  //       }
  //       arr.forEach((item, index) => {
  //         let filename = item.name;
  //         item.mv(`${dirupload}/${filename}`, (err) => {
  //           console.log(err);
  //         });
  //       });
  //     } else {
  //       let filename = arr.name;
  //       images.push(filename);
  //       console.log(images);
  //       arr.mv(`${dirupload}/${filename}`, (err) => {
  //         console.log(err);
  //       });
  //     }
  //   }
  //   Product.create(
  //     {
  // name: req.body.name,
  // price: req.body.price,
  // image: images,
  // quantity: req.body.quantity,
  // title: req.body.title,
  // description: req.body.description,
  //     },
  //     (err, rs) => {
  //       if (err) console.log(err);
  //       else {
  //         req.flash("success", "done");
  //         res.redirect("back");
  //       }
  //     }
  //   );
  post_create(req, res) {
    let image = req.files.image;
    let filename = image.name;
    image.mv(`${dirupload}/${filename}`, (err) => {
      console.log(err);
    });
    Product.create({
      name: req.body.name,
      price: req.body.price,
      image: `${filename}`,
      quantity: req.body.quantity,
      title: req.body.title,
      description: req.body.description,
    })
      .then((product) =>
        res.render("admin/create", {
          layout: false,
          product: mongooseToObject(product),
          data: {
            success: "Create Successfully!"
          },
        })
      )
      .catch((err) => {
        res.render("admin/create", {
          layout: false,
          product: mongooseToObject(product),
          data: {
            success: "Create Successfully!"
          },
        })
      });
  }

  //[GET] /admin
  index(req, res) {
    res.render("admin/list");
  }

  edit(req, res, next) {
    Product.findById(req.params.id)
      .then((product) =>
        res.render("admin/edit", { product: mongooseToObject(product) })
      )
      .catch(next);
  }
  // [PUT] /admin/:id
  put_edit(req, res, next) {
    Product.updateOne({ _id: req.params.id }, req.body
      )
      .then(() => res.redirect("/admin/list"))
      .catch(next);
  }

  list(req, res, next) {
    Product.find({})
      .then((product) => {
        res.render("admin/list", {
          product: multipleMongooseToObject(product),
          layout: false,
          // user: req.user,
        });
      })
      .catch(next);
  }

  //[POST] /admin/list
  delete(req, res, next) {
    let productID = req.params.id;
    Product.deleteOne({ _id: productID })
    .then(() => res.redirect('back'))
    .catch(next);
  }

  //[GET] /admin/listProduct
  // order(req, res, next) {
  //   var userID = userinfo(req);
  //   Order.find({})
  //     .then((order) => {
  //       res.render("admin/order", {
  //         order: multipleMongooseToObject(order),
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  order(req, res, next) {
    var userID = userinfo(req);
    Order.find({})
      .sort({ createdAt: -1 })
      .populate("user")
      .then((order) => {
        res.render("admin/order", {
          order: multipleMongooseToObject(order),
          layout: false,
        });
        // res.status(200).json({
        //   count: order.length,
        //   orders: order.map(order => {
        //     return {
        //       address: order.address,
        //       name: order.name,
        //       phone: order.user.phone,
        //     }
        //   })
        // })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // put_order(req, res, next) {
  //   let productID = req.params.id;
  //   Product.findOneAndUpdate({productID}, {
  //     $inc: {
  //       quantity: -1
  //     }
  //   })
  //     .then(product => {
  //        res.redirect('back')
  //     })
  //     .catch(next);
  // }

  update(req, res, next) {
    Order.updateOne({ _id: req.params.id }, {isDelivered: true},)
      .then(() => res.redirect("back"))
      .catch(next);
  }

  // const product = new Product(req.body);
  // product
  //   .save()
  //   .then(() => res.redirect("back"))
  //   .catch((error) => {});
  // res.send("Course saved!");
}
//[POST]/admin/store them du lieu
// store(req, res, next) {
//   const product = new Product(req.body);
//   product
//     .save()
//     .then(() => res.redirect("/admin/store"))
//     .catch((error) => {});
//   res.send("Create Successfully");
// }
const createToken = (id) => {
  return jwt.sign({ id }, "my secret key", {
    expiresIn: maxAge,
  });
};
module.exports = new AdminController();
