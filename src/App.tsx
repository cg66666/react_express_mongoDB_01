import React, {
  useEffect,
  useState,
  useReducer,
  useContext,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { PageRouter } from "src/routes";
import { getSomeText } from "src/api/index.js";
import { PersonalCard, Menu } from "src/component";
import {
  ContextProvider,
  DEFAULT_CONFIG,
  useToBe,
} from "src/context_reducer/initContextConfig";
import { reducer } from "src/context_reducer/reducer";
import { Tooltip } from "antd";
import logo from "./logo.svg";
import "./App.scss";
// const addMeta = {}
//   'viewport',
//   'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover',
// );
function App() {
  const { toLoginOrNot } = useToBe();
  const [value, dispatch] = useReducer(reducer, DEFAULT_CONFIG);
  const navigate = useNavigate();
  const [text, setText] = useState("");
  // (route) => {
  //   console.log('toLoginOrNot', toLoginOrNot);

  //   if (toLoginOrNot) {
  //     navigate(route);
  //   } else {
  //     console.log("未登录，跳转登录页面");
  //   }
  // };

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
        <Menu></Menu>
        <div className="logo-wrapper">
          <img src={logo} className="App-logo" alt="logo" />
          <Tooltip title="返回主页" placement="bottom">
            <div className="logoTrigger" onClick={() => navigate("/")}></div>
          </Tooltip>
        </div>
        <PersonalCard />
        <PageRouter />

        {/* https://v1.hitokoto.cn/?c=e&c=f&c=g&c=i&c=j&c=k&max_length=60 */}
        <div className="someText">{text}</div>
      </ContextProvider>
      {/* <div className="someText">急啊急啊急啊急啊阿九阿九阿九阿九阿九阿九急啊急啊急啊急啊急啊急啊急啊急啊急啊就</div> */}
    </div>
  );
}

export default App;
