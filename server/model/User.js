// 引入mongodb
const mongoose = require("../db/mongodb");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
// console.log(salt);
// 建立用户表
const UserSchema = new mongoose.Schema({
  // sessionId:{
  //   type: Number,
  //   default: new Date()
  // },
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    set(val) {
      return bcrypt.hashSync(val, salt);
    },
    select: false,
  },
  sex: {
    type: String,
    select: false,
  },
  name: {
    type: String,
    select: false,
    unique: true,
  },
  createTime: {
    type: Date,
    default: Date.now,
  },
  updateTime: {
    type: Date,
    default: Date.now,
  },
  salt: {
    type: String,
    unique: true,
  },
});

// 建立用户数据库模型
const User = mongoose.model("User", UserSchema);
module.exports = { User };
