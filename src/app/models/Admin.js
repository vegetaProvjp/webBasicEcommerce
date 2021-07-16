const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const bcrypt = require('bcrypt');
mongoose.plugin(slug);

const Admin = new mongoose.Schema({
    username: { type: String, require: true },
    email: {type: String, require: true},
    phone: {type: String, require: true},
    address: {type: String, require: true},
    fullName: {type: String, require: true},
    password: {type: String, require: true},
    avatar: {type: String, require: true},
}, {timestamps : true});

//Hash password trước khi lưu
Admin.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//Phương thức kiểm tra khi login
Admin.statics.login = async function(username, password){
    const admin = await this.findOne({username});
    if(admin){
        const auth = await bcrypt.compare(password, admin.password);
        if(auth){
            return admin;
        }
        throw Error("incorrect passwrord");
    };
    throw Error("incorrect admin");
}



// Set Object and Json property to true. Default is set to false
Admin.set('toObject', { virtuals: true });
Admin.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Admin', Admin,'admin');