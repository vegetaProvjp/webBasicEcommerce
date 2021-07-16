const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const bcrypt = require('bcrypt');
mongoose.plugin(slug);

const User = new mongoose.Schema({
    username: { type: String, require: true },
    email: {type: String, require: true},
    phone: {type: String, require: true},
    address: {type: String, require: true},
    fullName: {type: String, require: true},
    password: {type: String, require: true},
    avatar: {type: String, require: true},
    slug: { type: String, slug: "username" },
}, {timestamps : true});

//Hash password trước khi lưu
User.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//Phương thức kiểm tra khi login
User.statics.login = async function(username, password){
    const user = await this.findOne({username});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error("incorrect passwrord");
    };
    throw Error("incorrect username");
}

//quan hệ với product
User.virtual('product',{
    ref : 'Product',
    localField: '_id',
    foreignField: 'user'
})

// Set Object and Json property to true. Default is set to false
User.set('toObject', { virtuals: true });
User.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', User,'user');