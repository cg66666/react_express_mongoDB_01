import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useToBe } from "src/context_reducer/initContextConfig";
import "./Home.scss";
export function Home(): JSX.Element {
  const { toLoginOrNot, dispatch } = useToBe();
  let loginStatus = useMemo(() => {
    console.log("登录显示变量触发！！！", toLoginOrNot);

    return toLoginOrNot;
  }, [toLoginOrNot]);
  // useEffect(()=>{
  //   loginStatus.current = toLoginOrNot;
  // },[toLoginOrNot])
  // const [loginStatus,setLoginStatus] = useEffect
  console.log(toLoginOrNot);

  const navigate = useNavigate();
  return (
    <div>
      <div className="center-Img">
        {loginStatus ? (
          <></>
        ) : (
          <div>
            <div
              className="loader-login"
              onClick={() => navigate("/Login/login")}
            >
              <div className="text">登录</div>
              <span className="bar1"></span>
              <span className="bar2"></span>
              <span className="bar3"></span>
              <span className="bar4"></span>
            </div>
            <div
              className="loader-register"
              onClick={() => navigate("/Login/register")}
            >
              <div className="text">注册</div>
              <span className="bar1"></span>
              <span className="bar2"></span>
              <span className="bar3"></span>
              <span className="bar4"></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
