const createError = require("http-errors");
const { Token } = require("../model/Token");
const { User } = require("../model/User");
const duration = 60000 * 120;
const invalidateUserInfo = function (req, res, next) {
  // todo: 奇怪，这里新增的怎么都变成小写了？
  console.log('header',req.headers.userid);
  console.log(req.session.status);
  // 这里防止服务器重启session丢失
  // if (req.headers.token && req.session.status === "登陆成功") {
  if (req.headers.token) {
    Token.find({ token: req.headers.token }, "createTime", (err, tokenTime) => {
      console.log(err);
      if (err) {
        next(createError(401));
      }
      if (tokenTime.createTime + 7200000 < +new Date()) {
        console.log(token已过期);
        next(createError(401));
      }
      // console.log(tokenTime);
      // req.session.status = new Date().getTime();
      // req.name = result.name;
      // req.sex = result.sex;
      console.log("有session，通过");
      next();
    });
  } else {
    next(createError(401));
  }
  // 可以用这个校验
  // console.log('看一看校验',req.headers.Token);
  // next();
  // if (
  //   req.session.status &&
  //   req.session.status + duration > new Date().getTime() &&
  //   req.session.username
  // ) {
  //   User.find({ username: req.session.username }, "sex name", (err, result) => {
  //     if (err) {
  //       next(createError(401));
  //     } else {
  //       req.session.status = new Date().getTime();
  //       req.name = result.name;
  //       req.sex = result.sex;
  //       console.log("有session，通过");
  //       next();
  //     }
  //   });
  // } else {
  //   next(createError(401));
  // }
};
module.exports = invalidateUserInfo;
