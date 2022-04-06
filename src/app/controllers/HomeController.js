const { multipleMongooseToObject } = require("../../util/mongoose");
const Product = require('../models/Product');
class HomeController {

    //[GET]
    index(req, res, next) {

        Product.find({})
        .then(product => {
            res.render('home', {
                product: multipleMongooseToObject(product),
                // user: req.user,
            })
        })
        .catch(next);
    }

    search(req, res, next) {
        
    }
}

module.exports = new HomeController();