const express = require("express");
const router = express.Router();
const expressWs = require("express-ws"); // 引入 WebSocket 包
const { json } = require("stream/consumers");
const { Forum } = require("../model/Forum");

expressWs(router);

// const mongodb = require('mongodb');
// const MongoClient = require("mongodb").MongoClient;
// const url = 'mongodb://localhost:27017/ExpressApi';
// MongoClient.connect(url).then((client)=>{
//   let db = client.db('ExpressApi');
//   // console.log(db);
//   let change_streams = db.collection('forum').watch();
//   // console.log(change_streams);
//   change_streams.on('change',(change)=>{
//     // console.log(JSON.stringify(change));
//   })
// })
// const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect().then(db => {
//   //const changeStream = client.db(dbName).collection(tableName).watch();
//   const changeStream = client.watch();
//   changeStream.on("change", next => {
//       console.log(next);
//   });
// });
// User.watch('change',()=>{
//     console.log('!!!');
//   })
// Forum.watch().on("change", (data) => {
//   console.log('data',data);
//   if (data.operationType == "update") {
//     console.log(data.updateDescription.updatedFields);
//   }
// });

/* 
    建立长连接
*/
router.ws("/forum", (ws, req) => {
  console.log("connect success");
  // 使用 ws 的 send 方法向连接另一端的客户端发送数据
  ws.send("connect to express server with WebSocket success");
  // setTimeout(())
  // 使用 on 方法监听事件
  //   message 事件表示从另一段（服务端）传入的数据
  const timer = setInterval(() => {
    Forum.find()
      .populate("author")
      .then((result) => {
        // console.log(result);
        // const res = result.map((data) => {
        //   return {  
        //     author: (
        //       `<span style={{ color: "white" }}>${data.author.username}</span>`
        //     ),
        //     avatar: "https://joeschmoe.io/api/v1/random",
        //     content: `<p className={s.commentContent}>${data.comment}</p>,`,
        //     datetime: `<div style={{ color: "#ccc" }}>${data.creatTime}</div>`,
        //   };
        // });
        // console.log(res);
        ws.send(JSON.stringify(result));
      })
      .catch((err) => {
        return console.log("挂了");
      });
  }, 4000);

  ws.on("message", function (msg) {
    console.log(`receive message ${msg}`);
    ws.send("default response");
  });
  // 设置定时发送消息
  // let timer = setInterval(() => {
  //     console.log('执行了！！！');
  //     ws.send(`interval message ${new Date()}`)
  //   }, 2000)

  // close 事件表示客户端断开连接时执行的回调函数
  ws.on("close", function (e) {
    console.log("close connection");
    clearInterval(timer);
    // timer = undefined;
  });
});

module.exports = router;
