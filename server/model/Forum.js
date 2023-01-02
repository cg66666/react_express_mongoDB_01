const dayjs = require('dayjs')
// 引入mongodb
const mongoose = require("../db/mongodb");
// console.log(salt);
// 建立存储token
const ForumSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: String,
  },
  creatTime: {
    type: String,
    set(val) {
        return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
      },
  }
});

// 建立用户数据库模型
const Forum = mongoose.model("Forum", ForumSchema);
module.exports = { Forum };
