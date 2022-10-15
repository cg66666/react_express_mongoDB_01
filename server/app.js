const createError = require("http-errors");
const express = require("express");
// const path = require("path");
const cookieParser = require("cookie-parser");
// const logger = require("morgan");
const session = require("express-session");
const invalidateSession = require("./controler/invalidateSession");
// var indexRouter = require('./routes/index');
const usersRouter = require("./routes/login");
// const { User } = require("./model/User");

const app = express();
// app.pduration = 60000 * 120
// app.prototype.duration = 60000 * 120;
// 配置session
app.use(
  session({
    secret: "12345-67890-09876-54321", // 必选配置
    resave: false, //必选，建议false，只要保存登录状态的用户，减少无效数据。
    saveUninitialized: false, //必选，建议false，只要保存登录状态的用户，减少无效数据。
    cookie: { secure: false, maxAge: 800000, httpOnly: false }, // 可选，配置cookie的选项，具体可以参考文章的配置内容。
    name: "login-session", // 可选，设置个session的名字
    rolling: true,
    // store: new MongoStore({
    //     url: 'mongodb://localhost:27017/sessions_container', //存到这个数据库
    //     touchAfter: 24 * 3600, // 24小时存储一次
    //   }),
    // store: new FileStore() // 可选，使用fileStore来保存session，如未指定就会默认使用memoryStore
  })
);

app.use("/getName", invalidateSession);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// 以下时解析post数据用到的中间件，使用后可以在req.body获取用户的post数据
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/getName')

// app.use('/', indexRouter);
app.use("/login", usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
app.use((req, res, next) => {
  res.status(200).send("恭喜你，走完所有流程！");
});
// error handler
app.use(function (err, req, res, next) {
  if (err.status === 401) {
    res.status(err.status || 401).send("您未登录或您的登录信息已失效！");
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render("error");
});

module.exports = app;
