const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../model/User");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   console.log('路由跳转了！！！');
//   res.end();
// });

/* 
  注册
*/
router.post("/toRegister", async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  console.log("注册阶段：>>>", req.session.status);
  console.log("注册的密码>>>", req.body.password);
  User.create(
    {
      username: req.body.username,
      password: bcrypt.hashSync(req.body.username, salt),
      name: req.body.name,
      sex: req.body.sex,
      salt,
    },
    // set(val) {
    //   return bcrypt.hashSync(bcrypt.hashSync(val.id, 10), 10);
    // }
    function (err1, doc) {
      console.log(doc);
      if (err1) {
        console.log(err1);
        res.status(400).send("注册失败！");
      } else {
        console.log("注册成功！！！");
        // 本质上都是存储在session的id身上，然后凭借id去判断用户身份
        req.session.status = new Date().getTime();
        req.session.username = req.body.username;
        res.send("注册成功");
      }
    }
  );
});
/* 
  登录
*/
router.post("/toLogin", async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  console.log("登录阶段：session>>>", req.session.status);
  User.findOneAndUpdate(
    { username: req.body.username },
    {
      password: bcrypt.hashSync(req.body.password, salt),
      salt,
    },
    // todo:记笔记！！！
    { fields: "password salt" },
    async (err, result) => {
      if (err) {
        console.log("数据库发生错误");
        res.status(501).send("数据库发生错误");
      } else if (!result) {
        console.log("登录账号或密码错误！");
        res.status(401).send("账号或密码错误！");
      } else if (result) {
        // if(new Date().getTime() > result.expireTime){
        //   res.status(401).send("登录身份");
        // }
        console.log(result);
        //  todo:这里使用好坑啊！！！，记得补充笔记！！！
        const isEquality = bcrypt.compareSync(
          bcrypt.hashSync(req.body.password, result.salt),
          // req.body.password,
          result.password
        );
        if (!isEquality) {
          console.log("登录账号或密码错误！");
          res.status(401).send("账号或密码错误！");
          // todo:这里记得添加return！！！每次响应后应该添加return 笔记
          return;
        }
        req.session.status = new Date().getTime();
        req.session.username = req.body.username;
        console.log("登录成功！！！");
        res.send("登录成功！！！");
      }
    }
  );
});
module.exports = router;
