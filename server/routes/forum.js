const express = require("express");
const router = express.Router();
const expressWs = require("express-ws"); // 引入 WebSocket 包
const { Forum } = require("../model/Forum");
expressWs(router);

// User.watch('change',()=>{
//     console.log('!!!');
//   })
/* 
    初次进去获取页面信息
*/
router.get("/getComment", (req, res, next) => {
  Forum.create(
    {
      author: req.headers.userid,
      comment: "哈哈哈，今天天气真好啊！！！",
      creatTime: +new Date(),
    },
    (err, doc) => {
      if (err) {
        console.log(挂了);
      }
      console.log("存储成功了！！！");
    }
  );

  // Forum.find().populate('author').then(result => console.log(result));
  // console.log("成功进来了！！！");
  res.status(200).send("gogogo");
});
/* 
    建立长连接
*/
// router.ws("/", (ws, req) => {
//   console.log("connect success");
//   // 使用 ws 的 send 方法向连接另一端的客户端发送数据
//   ws.send("connect to express server with WebSocket success");
//   // Forum.watch().on("change", (data) => {
//   //   if (data.operationType == "update") {
//   //     console.log(data.updateDescription.updatedFields);
//   //   }
//   // });
//   // 使用 on 方法监听事件
//   //   message 事件表示从另一段（服务端）传入的数据
//   ws.on("message", function (msg) {
//     console.log(`receive message ${msg}`);
//     ws.send("default response");
//   });
//   // 设置定时发送消息
//   let timer = setInterval(() => {
//       console.log('执行了！！！');
//       ws.send(`interval message ${new Date()}`)
//     }, 2000)

//   // close 事件表示客户端断开连接时执行的回调函数
//   ws.on("close", function (e) {
//     console.log("close connection");
//     // clearInterval(timer);
//     timer = undefined;
//   });
// });

module.exports = router;
