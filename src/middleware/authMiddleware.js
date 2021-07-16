const jwt = require('jsonwebtoken');
const Admin = require('../app/models/Admin');
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'my secret key', async(err, decodedToken) => {
            if(err){
                res.redirect('/user/login');
                next();
            }
            else{
                next();
            }
        })
    }
    else{
        res.redirect('/user/login');
    }
}

module.exports = {requireAuth};