const { mongooseToObject } = require("../../util/mongoose");
const User = require("../models/User");

class PageController {
    //[GET] /page/about
    about(req, res) {
        res.render ('page/about');
    }

    //[GET] /page/faq
    faq(req, res) {
        res.render("page/faq");
    }
}

module.exports = new PageController();