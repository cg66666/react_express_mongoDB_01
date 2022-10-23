const setGreet = require("../utils");
const getPersonalInfo = function (req, res, next) {
  const greet = setGreet();
  res.send({ sex: req.sex, name: req.name, greet });
};
module.exports = getPersonalInfo;
