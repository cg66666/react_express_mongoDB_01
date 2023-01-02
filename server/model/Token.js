// 引入mongodb
const mongoose = require("../db/mongodb");
// console.log(salt);
// 建立存储token
const TokenSchema = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
  },
  createTime: {
    type: Number,
    default: +new Date(),
  },
});

// 建立用户数据库模型
const Token = mongoose.model("Token", TokenSchema);
module.exports = { Token };
