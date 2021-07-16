const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Product = new Schema({
    name: { type: String, require: true },
    description: { type: String },
    image: { type: String },
    slug: { type: String, slug: "title", unique: true },
    price: {type: String, require: true},
    title: {type: String, require: true},
    quantity: {type: String, require: true},
    category: {type: String, require: true},
    isAvailable: {type: Boolean, require: true},
    isDeleted: {type: Boolean, require: true},
    shippingFee: {type: String, require: true},
}, {timestamps : true});

module.exports = mongoose.model('Product', Product, 'product');