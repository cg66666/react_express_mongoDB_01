//引入axios
import axios from "axios";
//引入进度条+样式
import Nprogress from "nprogress";

import "nprogress/nprogress.css";
//进度条可以修改外观，需要改人家的css

import { getUserInfo, clearUserInfo } from "../utils/handle_Token_UserInfo";

const initRequest = axios.create({
  timeout: 5000,
});

initRequest.interceptors.request.use((config) => {
  Nprogress.start();
  return config;
});

initRequest.interceptors.response.use(
  (res) => {
    Nprogress.done();
    return res.data;
  },
  (error) => {
    Nprogress.done();
    return Promise.reject(error);
  }
);

//利用axios对象的一个方法，去创建一个axios实例！！！
//request实质就是axios
const requests = axios.create({
  //基础路径,当在利用request[axios]发请求的时候，在域名之后加上路径
  //http://128.0.0.2:3000/apigetToken
  baseURL: "/reactExpress",
  //超时的设置
  timeout: 5000,
});

//设置请求拦截器,项目当中经常发请求,请求之前会拦截到，会执行回调
requests.interceptors.request.use((config) => {
  console.log("config", config);
  if (!config.url.includes("/login")) {
    const userInfo = getUserInfo();
    if (!userInfo) {
      clearUserInfo();
      console.log("token缺失，请重新登录！");
    } else {
      config.headers.token = userInfo.token;
      config.headers.userId = userInfo.userId;
    }
  }
  //console.log(config);
  //   if (userTempId()) {
  //     config.headers.userTempId = userTempId();
  //   }
  //   if (GET_TOKEN()) {
  //     config.headers.token = GET_TOKEN();
  //   }

  //进度条开始动态来
  Nprogress.start();
  //config:配置对象,最值钱的地方，请求头【可以给后台携带数据】
  return config;
});

//设置响应拦截器：当请求的数据返回之后，触发！！！
requests.interceptors.response.use(
  (res) => {
    //{code:200,message:'成功',data:{}}
    //进度条结束
    Nprogress.done();
    return Promise.resolve(res.data);
  },
  (err) => {
    console.log("err ", err.response.data);
    Nprogress.done();
    return Promise.reject(err.response.data);
  }
);

//当前文件中有几个axios？
//axios:请求、响应拦截器没有的
//request:请求、响应拦截器

//对外暴露
export { requests, initRequest };
