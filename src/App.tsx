import React, { useEffect, useState, useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PageRouter } from "src/routes";
import { getSomeText } from "src/api/index.js";
import { PersonalCard } from "src/component";
import {
  ContextProvider,
  DEFAULT_CONFIG,
} from "src/context_reducer/initContextConfig";
import { reducer } from "src/context_reducer/reducer";
import logo from "./logo.svg";
import "./App.scss";
// const addMeta = {}
//   'viewport',
//   'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover',
// );
function App() {
  const [value, dispatch] = useReducer(reducer, DEFAULT_CONFIG);
  const navigate = useNavigate();
  // const location = useLocation();
  const [text, setText] = useState("");
  const getText = function () {
    getSomeText().then(
      (res) => {
        console.log(res);
        setText(res);
      },
      () => {
        getText();
      }
    );
  };
  useEffect(() => {
    getText();
    const getSomeTextTimer = setInterval(() => {
      getText();
    }, 30000);
    return () => {
      clearInterval(getSomeTextTimer);
    };
  }, []);
  return (
    <div className="App">
      <ContextProvider value={{ ...value, dispatch }}>
        <div className="menu">
          <div onClick={() => navigate("/forum")}>论坛</div>
          <div onClick={() => navigate("/music")}>音乐</div>
          <div onClick={() => navigate("/knowledge")}>知识</div>
          <div onClick={() => navigate("/game")}>游戏</div>
          {/* <button></button> */}
        </div>
        <div className="logo-wrapper">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <PersonalCard />
        <PageRouter></PageRouter>
        {/* https://v1.hitokoto.cn/?c=e&c=f&c=g&c=i&c=j&c=k&max_length=60 */}
        <div className="someText">{text}</div>
      </ContextProvider>
      {/* <div className="someText">急啊急啊急啊急啊阿九阿九阿九阿九阿九阿九急啊急啊急啊急啊急啊急啊急啊急啊急啊就</div> */}
    </div>
  );
}

export default App;
