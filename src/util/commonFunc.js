// const userinfo = require('./userinfo');
// const Product = require('../app/models/Product');
// const Deal = require('../app/models/Deal');
// const Category = require('../app/models/Category');
// const mongoose =  require('mongoose');
// const { toArrObject } = require('./mongooes');

// const searchProduct = async (req) => {
//     try {
//         let proPerPage = 10;
//         let userID = userinfo(req);
//         let page = req.body.page;
//         let title = req.body.title;
//         let category = req.body.category;
//         let area = req.body.area;

//         let userQuery = {
//             user: { $ne : mongoose.Types.ObjectId(userID) },
//             completed : false
//         }
//         let productQuery = {};
//         let categoryQuery = {};
//         let areaQuery = {};

//         if (title && title !== "") {
//             productQuery = {
//                 title: { "$regex": title, "$options": "i" },
//                 //query contain lowercase
//             }
//         }
//         if (category && category !== "") {
//             categoryQuery = {
//                 "category.name": category
//             }
//         }
//         if (area && area !== "") {
//             areaQuery = {
//                 "seller.area": area
//             }
//         }

//         let rs = await Product.aggregate()
//             .match(productQuery)
//             .match(userQuery)
//             .lookup({
//                 from: "category",
//                 localField: "category",
//                 foreignField: "_id",
//                 as: "category"
//             })
//             .lookup({
//                 from: 'user',
//                 localField: "user",
//                 foreignField: "_id",
//                 as: "seller"
//             })
//             .match(categoryQuery)
//             .match(areaQuery)
//             .skip(proPerPage * (page - 1))
//             .limit(proPerPage)
//         return rs;
//     } catch (error) {
//         console.log(error)
//     }
// }

// const getCategory = async (req) => {
//     try {
//         return await Category.find({});
//     } catch (error) {
//         console.log(error)
//     }
// }


const getUser = async (req) => {
    try {
        return await User.find({});
    } catch (error) {
        console.log(error)
    }
}

