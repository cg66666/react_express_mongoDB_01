const createError = require("http-errors");
const duration = 60000 * 120;
const { User } = require("../model/User");
const invalidateSession = function (req, res, next) {
  if (
    req.session.status &&
    req.session.status + duration > new Date().getTime() &&
    req.session.username
  ) {
    User.find({ username: req.session.username }, "sex name", (err, doc) => {
      if (err) {
        next(createError(401));
      } else {
        // console.log(doc[0]);
        /* <div className="greet">早上好，该搬砖啦 φ(*￣0￣)</div>  6-7 */
        /* <div className="greet">上午好，打起精神啦 (/≧▽≦)/</div> 8-11*/
        /* <div className="greet">中午好，该休息休息啦 (‾◡◝)</div> 12-13*/
        /* <div className="greet">下午好，马上下班啦 (●ˇ∀ˇ●)</div> 14-17*/
        /* <div className="greet">晚上好，一天辛苦啦 []~(￣▽￣)~*</div> 18-22*/
        /* <div className="greet">深夜了，该休息啦 o(*￣▽￣*)ブ</div> 23-1*/
        /* <div className="greet">{`别熬夜，明天还要搬砖呢 (*>﹏<*)`}</div> 2-6*/
        if (req.baseUrl === "/getName") {
          let greet;
          const nowHour = new Date().getHours();
          //   console.log([23, 1].includes(a));
          switch (true) {
            case [6, 7].includes(nowHour):
              greet = `早上好，该搬砖啦 φ(*￣0￣)`;
              break;
            case [8, 9, 10, 11].includes(nowHour):
              greet = `上午好，打起精神啦 (/≧▽≦)/`;
              break;
            case [12, 13].includes(nowHour):
              greet = `中午好，该休息休息啦 (‾◡◝)`;
              break;
            case [14, 15, 16, 17].includes(nowHour):
              greet = `下午好，马上下班啦 (●ˇ∀ˇ●)`;
              break;
            case [18, 19, 20, 21, 22].includes(nowHour):
              greet = `晚上好，一天辛苦啦 []~(￣▽￣)~*`;
              break;
            case [23, 0, 1].includes(nowHour):
              greet = `深夜了，该休息啦 o(*￣▽￣*)ブ`;
              break;
            case [2, 3, 4, 5, 6].includes(nowHour):
              greet = `别熬夜，明天还要搬砖呢 (*>﹏<*)`;
              break;
            default:
              console.log("???");
              break;
          }
          return res
            .status(200)
            .send({ sex: doc[0].sex,name: doc[0].name, greet });
        }
        console.log("有session，通过");
        next();
      }
    });
  } else {
    next(createError(401));
  }
};
module.exports = invalidateSession;
