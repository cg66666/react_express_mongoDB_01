import React, { useState, useEffect } from "react";
import { toRegister, toLogin } from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import { useToBe } from "src/context_reducer/initContextConfig";
import {
  clearUserInfo,
  setUserInfo,
} from "../../utils/handle_Token_UserInfo";
import { message } from "antd";
import md5 from "js-md5";
import "./Login.scss";
export function Login(): JSX.Element {
  const { dispatch } = useToBe();
  const params = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sex, setSex] = useState("male");
  const [name, setName] = useState("");
  const [isSamePassword, setIsSamePassword] = useState(false);
  // useEffect(() => {
  //   console.log("个人信息页获取的个人信息>>>", userInfo);
  // }, [userInfo]);
  return (
    <div className="login-wrap">
      <div className="mask" />
      {params.type === "login" ? (
        <div>
          {" "}
          <div className="center-Img" />
          <div className="login-container" style={{ color: "white" }}>
            <div
              className="cancel"
              onClick={() => {
                navigate("/home");
              }}
            >
              ×
            </div>
            <div className="container">
              <div className="input-wrap">
                <span>账号</span>
                <input
                  type="text"
                  className="common-input"
                  onChange={(val) => {
                    setUsername(val.target.value);
                  }}
                />
              </div>
              <div className="input-wrap">
                <span>密码</span>
                <input
                  type="password"
                  className="common-input"
                  onChange={(val) => {
                    setPassword(val.target.value);
                  }}
                />
              </div>
              <div
                className="item"
                onClick={() => {
                  username &&
                    password &&
                    toLogin({
                      username: md5(username),
                      password: md5(password),
                    }).then(
                      (res) => {
                        console.log(res);
                        setUserInfo(res);
                        console.log("登录成功");
                        dispatch({ type: "Logining" });
                        navigate("/home");
                      },
                      (err) => {
                        message.error(err)
                        clearUserInfo();
                        dispatch({ type: "not_Login" });
                      }
                    );
                }}
              >
                <div className="text">登录</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="center-Img" />
          <div className="register-wrap">
            <div
              className="cancel"
              onClick={() => {
                navigate("/home");
              }}
            >
              ×
            </div>
            <div className="container">
              <div className="input-wrap">
                <span>昵称</span>
                <input
                  type="text"
                  className="common-input"
                  onChange={(val) => {
                    setName(val.target.value);
                  }}
                />
              </div>
              <div className="input-wrap">
                <span>性别</span>
                <label htmlFor="male" className="checkSex">
                  男
                </label>
                <input
                  id="male"
                  type="radio"
                  checked={sex === "male"}
                  name="sex"
                  value="male"
                  onChange={(val) => setSex(val.target.value)}
                />
                <label htmlFor="female" className="checkSex">
                  女
                </label>
                <input
                  id="female"
                  type="radio"
                  checked={sex === "female"}
                  name="sex"
                  value="female"
                  onChange={(val) => setSex(val.target.value)}
                />
              </div>
              <div className="input-wrap">
                <span>账号</span>
                <input
                  type="text"
                  className="common-input"
                  onChange={(val) => {
                    setUsername(val.target.value);
                  }}
                />
              </div>
              <div className="input-wrap">
                <span>密码</span>
                <input
                  type="password"
                  className="common-input"
                  onChange={(val) => {
                    setPassword(val.target.value);
                  }}
                />
              </div>
              <div className="input-wrap">
                <span style={{ fontSize: "12px" }}>再次输入密码</span>
                <input
                  type="password"
                  className="common-input"
                  style={{ marginLeft: "-1px" }}
                  onChange={(val) => {
                    if (val.target.value === password) {
                      setIsSamePassword(true);
                    }
                  }}
                />
              </div>
              <div
                className="item"
                onClick={() => {
                  if (isSamePassword && sex && username && password && username.length < 16) { 
                    toRegister({
                      username: md5(username),
                      password: md5(password),
                      sex,
                      name,
                    }).then(
                      (res) => {
                        console.log(res);
                        setUserInfo(res);
                        console.log("注册成功！");
                        dispatch({ type: "Logining" });
                        navigate("/home");
                      },
                      (err) => {
                        message.error(err)
                        clearUserInfo();
                        dispatch({ type: "not_Login" });
                      }
                    );
                  } else {
                    message.warn("您输入的注册信息有误，请仔细核对");
                  }
                }}
              >
                <div className="text">注册</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
