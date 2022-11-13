// 引入mongodb
const mongoose = require("../db/mongodb");
// console.log(salt);
// 建立存储token
const ForumSchema = new mongoose.Schema({
  
});

// 建立用户数据库模型
const Forum = mongoose.model("Forum", ForumSchema);
module.exports = { Forum };
