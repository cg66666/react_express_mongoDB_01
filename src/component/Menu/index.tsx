/* 
    绝对定位，定位于app标签
*/
import React, { useEffect, useState, useCallback } from "react";
// import { getPersonalName } from "src/api";
import { useToBe } from "src/context_reducer/initContextConfig";
import { useNavigate } from "react-router-dom";
import { message, Button } from 'antd'
// import { userInfo } from "src/const";
import "./index.scss";
export function Menu(): JSX.Element {
  const { toLoginOrNot, dispatch } = useToBe();
  const navigate = useNavigate();
  const navigateTo = useCallback(
    (route) => {
      console.log("方法里面的toLoginOrNot", toLoginOrNot);
      if (toLoginOrNot) {
        navigate(route);
      } else {
        message.warning("您还未登录，3s后将跳转登录页面");
      }
    },
    [toLoginOrNot]
  );
  return (
    <div className="menuWrap">
      <div className="menu">
        <div
          onClick={() => {
            navigateTo("/forum");
          }}
        >
          论坛
        </div>
        <div
          onClick={() => {
            navigateTo("/music");
          }}
        >
          音乐
        </div>
        <div
          onClick={() => {
            navigateTo("/knowledge");
          }}
        >
          知识
        </div>
        <div
          onClick={() => {
            navigateTo("/game");
          }}
        >
          游戏
        </div>
        {/* <button></button> */}
      </div>
    </div>
  );
}
