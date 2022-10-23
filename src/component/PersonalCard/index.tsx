/* 
    绝对定位，定位于app标签
*/
import React, { useEffect, useState } from "react";
// import { getPersonalName } from "src/api";
import { useToBe } from "src/context_reducer/initContextConfig";
import { getToken, clearUserInfo } from "../../utils/handle_Token_UserInfo";
// import { userInfo } from "src/const";
import "./index.scss";
export function PersonalCard(): JSX.Element {
  const { toLoginOrNot, dispatch } = useToBe();
  
  const [greet, setGreet] = useState("");
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const handlePersonalInfo = (mode) => {
    console.log("mode", mode);
    if (mode === "clear") {
      localStorage.removeItem("sex");
      localStorage.removeItem("greet");
      localStorage.removeItem("name");
      localStorage.removeItem("username");
      localStorage.removeItem("loginStatus");
      setGreet("");
      setName("");
      setSex("");
      dispatch({ type: "not_Login" });
      return;
    }
    if (mode === "getAndSet") {
      const greet = localStorage.getItem("greet");
      const name = localStorage.getItem("name");
      const sex = localStorage.getItem("sex");
      const loginStatus = localStorage.getItem("loginStatus");
      if (greet && name && sex && loginStatus) {
        setGreet(greet);
        setName(name);
        setSex(sex);
        return true;
      }
      return false;
    }
    console.log("handleLocalStorage函数触发条件不足");
    return false;
  };
  useEffect(() => {
    // 登录失败这种情况这负责清空这个组件里面的内容即可
    const userInfo = handlePersonalInfo("getAndSet");
    if (!userInfo) {
      // 清空本地存储数据
      handlePersonalInfo('clear')
      console.log("跳转登录页");
    }
    // }
  }, [toLoginOrNot]);
  return (
    <div>
      {greet && name && sex ? (
        <div
          className="personalWrap"
          onClick={() => {
            handlePersonalInfo('clear')
            console.log("退出登录！！！");
          }}
        >
          <div className="border"></div>
          <div className="container">
            <div className="name">{`欢迎 ${name} ${
              (sex === "male" && "先生") || (sex === "female" && "女士")
            } `}</div>
            <div className="greet">{greet}</div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
