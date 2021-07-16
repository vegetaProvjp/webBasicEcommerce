const jwt = require('jsonwebtoken');
const Admin = require('../app/models/Admin');
const userinfo = require('../util/userinfo');

const requireAuth1 = async (req,res,next) => {
    try {
        let userID = userinfo(req);
        let completed = req.body.completed;//lấy trạng thái đã bán hay chưa bán: true, false
        const check = await Admin.find({ _id: userID })
        if (check.length == 1 ) next();
        else {
            res.redirect('/');
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = {requireAuth1};