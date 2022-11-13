const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const setGreet = require("../utils");
const { User } = require("../model/User");
const { Token } = require("../model/Token");

/* 
  注册
*/
router.post("/toRegister", async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  console.log("注册阶段：>>>");
  console.log("注册的账号>>>", req.body.username);
  console.log("注册的密码>>>", req.body.password);
  const token = bcrypt.hashSync(String(new Date().getTime()), salt);
  Token.create(
    {
      token: token,
      createTime: Date.now()
    },
    (err2, tokenInfo) => {
      if (err2) {
        console.log(err2);
        return res.status(400).send("注册失败！");
      } else {
        User.create(
          {
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, salt),
            name: req.body.name,
            sex: req.body.sex,
            salt,
          },
          (err1, userInfo) => {
            console.log(userInfo.id);
            if (err1) {
              if (
                err1.message.includes(
                  `E11000 duplicate key error collection: ExpressApi.users index: username_1 dup key: { username: "`
                )
              ) {
                return res.status(400).send("注册用户名已存在！");
              }
              console.log(err1.message);
              return res.status(400).send("注册失败！");
            } else {
              console.log("注册成功！！！");
              req.session.status = "登陆成功";
              const greet = setGreet();
              console.log({
                sex: req.body.sex,
                name: req.body.name,
                greet,
                token: tokenInfo.token,
                id: userInfo.id
              });
              return res.send({
                sex: req.body.sex,
                name: req.body.name,
                greet,
                token: tokenInfo.token,
                id: userInfo.id
              });
            }
          }
        );
      }
    }
  );
});
/* 
  登录
*/
router.post("/toLogin", async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  console.log(req.body.username);

  // todo find 方法，默认会返回一个数组，
  // todo 可以使用findOne方法   这里第二个参数过滤，可以使用字符串，这是和下面哪个findAndUpdata不同的地方
  User.find(
    { username: req.body.username },
    "password salt sex name",
    async (err, doc) => {
      if (err || doc.length > 1) {
        console.log("数据库发生错误");
        res.status(501).send("数据库发生错误");
      } else if (!doc || doc.length < 1) {
        console.log("登录账号或密码错误！");
        res.status(401).send("账号或密码错误！");
      } else if (doc) {
        const userInfo = doc[0];
        const isEquality = bcrypt.compareSync(
          bcrypt.hashSync(req.body.password, userInfo.salt),
          userInfo.password
        );
        console.log("isEquality", isEquality);
        // return;
        if (!isEquality) {
          console.log("登录账号或密码错误！");
          return res.status(401).send("账号或密码错误！");
          // todo:这里记得添加return！！！每次响应后应该添加return 笔记
        }
        User.updateOne(
          { _id: userInfo.id },
          {
            password: bcrypt.hashSync(req.body.password, salt),
            salt,
          },
          () => {
            const token = bcrypt.hashSync(
              String(new Date().getTime()),
              userInfo.salt
            );
            Token.create(
              {
                token: token,
                createTime: Date.now()
              },
              (err2, tokenInfo) => {
                console.log("Token>>>", tokenInfo);
                if (err2) {
                  console.log(err2);
                  return res.status(400).send("登录失败！");
                } else {
                  console.log("登录成功！！！");
                  req.session.status = "登陆成功";
                  const greet = setGreet();
                  return res.send({
                    sex: userInfo.sex,
                    name: userInfo.name,
                    greet,
                    token,
                    id: userInfo.id
                  });
                }
              }
            );
          }
        );
      }
    }
  );

  //   { username: req.body.username },
  //   {
  //     password: bcrypt.hashSync(req.body.password, salt),
  //     salt,
  //   },
  // todo:记笔记！！！
  //   { fields: "password salt sex name" },
  //   async (err, userInfo) => {
  //     if (err) {
  //       console.log("数据库发生错误");
  //       res.status(501).send("数据库发生错误");
  //     } else if (!userInfo) {
  //       console.log("登录账号或密码错误！");
  //       res.status(401).send("账号或密码错误！");
  //     } else if (userInfo) {
  //       console.log(userInfo);
  //  todo:这里使用好坑啊！！！，记得补充笔记！！！
  //       const isEquality = bcrypt.compareSync(
  //         bcrypt.hashSync(req.body.password, userInfo.salt),
  //         userInfo.password
  //       );
  //       if (!isEquality) {
  //         console.log("登录账号或密码错误！");
  //         return res.status(401).send("账号或密码错误！");
  // todo:这里记得添加return！！！每次响应后应该添加return 笔记
  //       }
  //       const token = bcrypt.hashSync(
  //         String(new Date().getTime()),
  //         userInfo.salt
  //       );
  //       Token.create(
  //         {
  //           token: token,
  //         },
  //         (err2, tokenInfo) => {
  //           console.log("Token>>>", tokenInfo);
  //           if (err2) {
  //             console.log(err2);
  //             return res.status(400).send("登录失败！");
  //           } else {
  //             console.log("登录成功！！！");
  //             req.session.status = "登陆成功";
  //             const greet = setGreet();
  //             return res.send({
  //               sex: userInfo.sex,
  //               name: userInfo.name,
  //               greet,
  //               token,
  //             });
  //           }
  //         }
  //       );
  //     }
  //   }
  // );
});
module.exports = router;

// User.findOneAndUpdate(
