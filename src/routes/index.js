const newsRouter = require("./news");
const homeRouter = require("./home");
const pageRouter= require("./page");
const userRouter = require("./user");
const productRouter = require("./product");
const adminRouter = require("./admin");
const usersRouter = require("./users");
function route(app) {
  app.use("/news", newsRouter);
  app.use("/page",pageRouter);
  app.use("/user",userRouter);
  //app.use("/users",usersRouter);
  app.use('/product',productRouter);
  app.use('/admin',adminRouter)
  app.use("/", homeRouter);
}

module.exports = route;

//Khi require file index.js trong routes thì sẽ nhận được giá trị route
// khi đó sẽ sử dụng nó trong function route
