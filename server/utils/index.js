const setGreet = () => {
  let greet;
  const nowHour = new Date().getHours();
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
  return greet;
};
module.exports = setGreet;