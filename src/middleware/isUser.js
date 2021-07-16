const jwt = require('jsonwebtoken');
const User = require('../app/models/User')
const isUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'my secret key', async(err, decodedToken) => {
            if(err){
                res.locals.user = null;
            }
            else{
                let user = await User.findById(decodedToken.id).lean();
                res.locals.user = user;
                next();
            }
        })
    }
    else{
        res.locals.user = null;
    }
}

module.exports = {isUser};