/* 
    绝对定位，定位于app标签
*/
import React, { useEffect, useState } from "react";
import { getPersonalName } from "src/api";
import { useToBe } from "src/context_reducer/initContextConfig";
import "./index.scss";
export function PersonalCard(): JSX.Element {
  const { userInfo, dispatch } = useToBe();
  const [greet, setGreet] = useState("");
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  useEffect(() => {
    console.log(userInfo);

    if (!userInfo) {
      getPersonalName().then((res) => {
        setGreet(res.greet);
        setName(res.name);
        setSex(res.sex);
      });
    }
    // console.log(a);
  }, []);
  useEffect(() => {
    console.log("个人信息页获取的个人信息>>>", userInfo);
    if (userInfo) {
      setGreet(userInfo.greet);
      setName(userInfo.name);
      setSex(userInfo.sex);
    }
  }, [userInfo]);
  return (
    <div>
      {userInfo.name && userInfo.sex && userInfo.greet ? (
        <div className="personalWrap">
          <div className="border"></div>
          <div className="container">
            <div className="name">{`${name} ${
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
