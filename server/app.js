const createError = require("http-errors");
const express = require("express");
// const path = require("path");
const cookieParser = require("cookie-parser");
// const logger = require("morgan");
const session = require("express-session");
const invalidateUserInfo = require("./controler/invalidateUserInfo");
// var indexRouter = require('./routes/index');
const usersRouter = require("./routes/login");
const getPersonalInfo = require('./controler/getPersonalInfo')
const expressWs = require('express-ws') // 引入 WebSocket 包
const forumRouter = require('./routes/forum');
const wsSocketRouter = require('./routes/wsSocket');
// const { User } = require("./model/User");

const app = express();
expressWs(app) // 将 WebSocket 服务混入 app，相当于为 app 添加 .ws 方法
// app.pduration = 60000 * 120
// app.prototype.duration = 60000 * 120;
// 配置session
// todo: session会在服务器重启的时候丢失！！！
app.use(
  session({
    secret: "12345-67890-09876-54321", // 必选配置
    resave: false, //必选，建议false，只要保存登录状态的用户，减少无效数据。
    saveUninitialized: false, //必选，建议false，只要保存登录状态的用户，减少无效数据。
    cookie: { secure: false, maxAge: 7200000, httpOnly: false }, // 可选，配置cookie的选项，具体可以参考文章的配置内容。
    name: "login-session", // 可选，设置个session的名字
    rolling: true,
    // store: new MongoStore({
    //     url: 'mongodb://localhost:27017/sessions_container', //存到这个数据库
    //     touchAfter: 24 * 3600, // 24小时存储一次
    //   }),
    // store: new FileStore() // 可选，使用fileStore来保存session，如未指定就会默认使用memoryStore
  })
);


// app.use("", (req,res,next)=>{
//   console.log('看一看校验',req.headers);
//   next();
// });
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// 以下时解析post数据用到的中间件，使用后可以在req.body获取用户的post数据
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use("/", invalidateUserInfo);
app.use("/forum", invalidateUserInfo);

// app.use('/getName',getPersonalInfo);
app.use("/login", usersRouter);
app.use("/forum", forumRouter);
app.use("/wsSocket", wsSocketRouter);


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

// websocket 的处理
// app.ws('/forum', function (ws, req) {
//   console.log('connect success')
//   // console.log(ws)
  
//   // 使用 ws 的 send 方法向连接另一端的客户端发送数据
//   ws.send('connect to express server with WebSocket success')

//   // 使用 on 方法监听事件
//   //   message 事件表示从另一段（服务端）传入的数据
//   ws.on('message', function (msg) {
//     console.log(`receive message ${msg}`)
//     ws.send('default response')
//   })

//   // 设置定时发送消息
//   let timer = setInterval(() => {
//     console.log('执行了！！！');
//     ws.send(`interval message ${new Date()}`)
//   }, 2000)

//   // close 事件表示客户端断开连接时执行的回调函数
//   ws.on('close', function (e) {
//     console.log('close connection')
//     clearInterval(timer)
//     timer = undefined
//   })
// })


module.exports = app;
