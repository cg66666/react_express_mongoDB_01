const createError = require("http-errors");
const { Token } = require("../model/Token");
const { User } = require("../model/User");
const duration = 60000 * 120;
const invalidateUserInfo = function (req, res, next) {
  console.log(req.headers.token);
  console.log(req.session.status);
  console.log(req.session.status === "登陆成功");
  if (req.headers.token && req.session.status === "登陆成功") {
    Token.find({ token: req.headers.token }, "createTime", (err, tokenTime) => {
      console.log(err);
      if (err) {
        next(createError(401));
      } else {
        console.log(tokenTime);
        // req.session.status = new Date().getTime();
        // req.name = result.name;
        // req.sex = result.sex;
        // console.log("有session，通过");
        next();
      }
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
