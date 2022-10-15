import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.scss";
export function Home(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div>
      <div className="center-Img">
        <div className="loader-login" onClick={() => navigate("/Login/login")}>
          <div className="text">登录</div>
          <span className="bar1"></span>
          <span className="bar2"></span>
          <span className="bar3"></span>
          <span className="bar4"></span>
        </div>
        <div className="loader-register" onClick={() => navigate("/Login/register")}>
          <div className="text">注册</div>
          <span className="bar1"></span>
          <span className="bar2"></span>
          <span className="bar3"></span>
          <span className="bar4"></span>
        </div>
      </div>
    </div>
  );
}
