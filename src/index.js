// const express = require("express");
// const handlebars = require("express-handlebars");
// const path = require("path");
// const route = require("./routes");
// const db = require("./config/db");
// const app = express();
// const port = 4000;
// const flash = require("connect-flash");
// const session = require("express-session");
// const fileUpload = require("express-fileupload");
// const cookieParser = require("cookie-parser");
// const LocalStrategy = require("passport-local");
// const passportLocalMongoose = require("passport-local-mongoose");
// const passport = require("passport");
// const User = require("../src/app/models/User");
// // const multer = require('multer');

// //connect to db
// db.connect();

// //middleware
// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );
// app.use(express.json());

// //files upload
// app.use(fileUpload());

// //config middle ware để sử dụng các file static
// app.use(express.static(path.join(__dirname, "public")));


// //template engine
// app.engine(
//   "hbs",
//   handlebars({
//     extname: ".hbs",
//   })
// );
// app.set("view engine", "hbs");
// app.set("views", path.join(__dirname, "resources", "views"));
// app.use(cookieParser());
// //session
// app.use(
//   session({
//     cookie: { maxAge: 60000 },
//     secret: "codeworkrsecret",
//     saveUninitialized: false,
//     resave: false,
//   })
// );

// app.use(function (req, res, next) {
//   res.locals.user = req.user
//   next()
// })

// app.use(passport.initialize());
// app.use(passport.session());

// //{{#if user}} cho tat ca cac page
// app.use(function (req, res, next) {
//   res.locals.user = req.user; // This is the important line
//   next();
// });
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// //flash: redirect back with param
// app.use(flash());

// //route init
// route(app);

// app.listen(port, function (error) {
//   if (error) {
//     console.log("Something went wrong");
//   }
//   console.log(`server is running at: http://localhost:${port}`);
// });

// // render('...') thì không có gạch / ở đầu
// //get('...') thì có / ở đầu
const path = require('path');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 4000;
const route = require('./routes');
const db = require('./config/db');
// const helpers = require('./util/handlebarHelpers');
const flash = require('connect-flash');
const session = require('express-session');
const helpers = require ('./util/helpers');
const methodOverride = require('method-override');
const mongooseSlugGenerator = require('mongoose-slug-generator');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const passport = require('passport');
//connect DB
db.connect();

//middleware
app.use(express.urlencoded({
    extended : true
}));
app.use(express.json());
//config middle ware để sử dụng các file static
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
//files upload
app.use(fileUpload());
//flash: redirect back with param
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
//session
app.use(session({ 
  cookie: { maxAge: 60000 }, 
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/project',
    autoRemove: 'native' // Default
  }),
  secret: 'woot',
  resave: false, 
  saveUninitialized: false,
}));

app.use(function (req, res, next) {
  res.locals.session = req.session;
  next()
})

//biến local kiểm tra trạng thái đăng nhập
app.locals.login = false;

//template engine
app.engine('hbs',handlebars({
    extname : '.hbs',
    helpers: helpers
}))
app.set('view engine', 'hbs');
//config views
app.set('views', path.join(__dirname, 'resources' , 'views'));


//router
route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})