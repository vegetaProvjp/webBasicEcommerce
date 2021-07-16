const jwt = require('jsonwebtoken');
const userinfo = (req) => {
    const token = req.cookies.jwt;
    if(token === ""){
        return null;
    }
    else{
        try {
            let decoded = jwt.verify(token, 'my secret key');
            // console.log(decoded.id);
            return decoded.id;
        } catch (e) {
            return null;
        }
    }
}

module.exports = userinfo;