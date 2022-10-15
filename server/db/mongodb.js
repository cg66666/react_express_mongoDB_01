// 引入 mongoose
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/ExpressApi";
// 连接数据库，自动新建 ExpressApi 库
// mongoose.connect("mongodb://localhost:27017/ExpressApi", {
//   useNewUrlParser: true, // 避免“不建议使用当前URL字符串解析器”
//   useCreateIndex: true, // 解决MongoDB弃用警告
//   useUnifiedTopology: true, // 解决连接报错问题
//   useFindAndModify: false,
// });

mongoose.connect(url, function (err, db) {
  if (err) throw err;
  console.log("数据库连接成功！");
//   db.close();
})

module.exports = mongoose;
