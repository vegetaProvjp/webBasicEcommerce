const jwt = require('jsonwebtoken');
const Admin = require('../app/models/Admin');
const isAdmin = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'my secret key', async(err, decodedToken) => {
            if(err){
                res.locals.admin = null;
                
            }
            else{
                let admin = await Admin.findById(decodedToken.id).lean();
                console.log(admin);
                res.locals.user = admin;
                next();
            }
        })
    }
    else{
        res.locals.admin = null;
    }
}

module.exports = {isAdmin};