const { mongooseToObject } = require("../../util/mongoose");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const User = require("../models/User");
const userinfo = require("../../util/userinfo");
const getUser = require("../../util/commonFunc");

const mongooseSlugGenerator = require("mongoose-slug-generator");
class ProductController {
  detail(req, res, next) {
    Product.findOne({ slug: req.params.slug })
      .then((product) => {
        res.render("product/detail", { product: mongooseToObject(product) });
      })
      .catch(next);
  }

  search(req, res, next) {
    if (req.query.search) {
      const regex = new RegExp(escapeRegex(req.query.search), "gi");
      Product.find({ name: regex }, function (err, product) {
        if (err) {
          console.log(err);
        } else {
          res.render("product/search/index", { product: product });
        }
      });
    } else {
      Product.find({}, function (err, product) {
        if (err) {
          console.log(err);
        } else {
          res.render("product/search/index", { product: product });
        }
      });
    }
  }
  cart(req, res, next) {
    if (!req.session.cart) {
      return res.render("product/cart", { products: null });
    }
    var cart = new Cart(req.session.cart);
    res.render("product/cart", {
      products: cart.generateArray(),
      totalPrice: cart.totalPrice,
    });
  }

  addToCart(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function (err, product) {
      if (err) {
        return res.redirect("/");
      }
      cart.add(product, product.id);
      req.session.cart = cart;
      console.log(req.session.cart);
      res.redirect("/");
    });
  }

  checkout(req, res, next) {
    if (!req.session.cart) {
      return res.redirect("product/cart");
    }
    var cart = new Cart(req.session.cart);
    // res.render("product/checkout", { total: cart.totalPrice });
    let userID = userinfo(req);
    User.findById(userID)
      .then((user) =>
        res.render("product/checkout", {
          total: cart.totalPrice,
          user: mongooseToObject(user),
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }

  post_checkout(req, res, next) {
    if (!req.session.cart) {
      return res.redirect("/product/cart");
    }
    var cart = new Cart(req.session.cart);
    var userID =  userinfo(req);
    Order.create({
      user: userID,
      cart: cart,
      address: req.body.address,
      name: req.body.name,
    })
      .then(res.redirect("/"))
      .catch((err) => {
        console.log(err);
      });
  }

  reduce(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect("/product/cart");
  }

  increase(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.increaseByOne(productId);
    req.session.cart = cart;
    res.redirect("/product/cart");
  }

  remove(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect("/product/cart");
  }
}

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = new ProductController();
