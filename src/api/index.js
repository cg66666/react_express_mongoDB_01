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
    const a = await requests({
      url: "/login/toRegister",
      method: "post",
      data,
    });
    if (a) {
      resolve("获取成功");
    }
    reject("获取失败");
  });

/* 
  登录
*/
export const toLogin = (data) =>
  new Promise(async (resolve, reject) => {
    const a = await requests({ url: "/login/toLogin", method: "post", data });
    if (a) {
      resolve("获取成功");
    }
    reject("获取失败");
  });
// requests({ url: "/login/toLogin", method: "post", data });
/* 
  获取登录信息（登陆状态）
*/
export const getPersonalName = () =>
  new Promise(async (resolve, reject) => {
    console.log("自动开始执行自动获取！！！");
    const userInfo = await requests({ url: "/getName", method: "get" });
    // console.log(a);
    if (userInfo) {
      resolve(userInfo);
    }
    reject("返回失败！！！");
  });
