import { requests, initRequest } from "./request";
import axios from "axios";
export const getSomeText = () =>
  new Promise((resolve, reject) => {
    axios
      .get("https://v1.hitokoto.cn/?c=e&c=f&c=g&c=i&c=j&c=k&max_length=60")
      .then(({ data }) => {
        resolve(data.hitokoto);
      })
      .catch((error) => {
        console.error("网页内容加载失败，请刷新重试！///" + error);
        reject();
      });
  });
/* 
  login路由请求
*/
/* 
  注册
 */
export const toRegister = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await requests({
        url: "/login/toRegister",
        method: "post",
        data,
      });
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });

/* 
  登录
*/
export const toLogin = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const res =
        (await requests({ url: "/login/toLogin", method: "post", data })) || "";
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
/* 
  获取论坛信息
*/
export const getForum = () =>
  new Promise((resolve, reject) => {
    requests({ url: "/forum/getComment", method: "get" })
      .then((res) => {
        console.log(res);
        resolve(res);
      })
      .catch((err) => {
        console.log("请求论坛信息挂了");
        reject(err);
        // console.log();
      });
  });
/* 
  获取登录信息（登陆状态）
*/
// export const getPersonalName = () =>
//   new Promise((resolve, reject) => {
//     console.log("自动开始执行自动获取！！！");
//     requests({ url: "/getName", method: "get" }).then(
//       (res) => {
//         resolve(res);
//       },
//       (err) => {
//         console.log("返回失败", err);
//         reject("返回失败！！！");
//       }
//     );
//     // console.log('userInfo>>>', userInfo);
//     // if (userInfo) {

//     // }
//     // reject("返回失败！！！");
//   });
