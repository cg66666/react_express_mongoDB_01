import React, { useEffect, Fragment, useRef, useState } from "react";
import { Avatar, Comment, Tooltip, List, Form, Input, Button } from "antd";
import { getForum } from "src/api";
import dayjs from "dayjs";
// import moment from 'moment';

import s from "./forum.module.scss";
interface EditorProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  submitting: boolean;
  value: string;
}
interface CommentItem {
  author: string;
  avatar: string;
  content: React.ReactNode;
  // datetime: string;
}
export function Forum(): JSX.Element {
  const { TextArea } = Input;
  const [data, setData] = useState<any[]>([]);
  const [data2, setData2] = useState<any[]>([]);
  let timer;
  // *:这里写个假数据
  const oldData2 = useRef({
    createTime: ''
  });
  const [openComment, setOpenComment] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const takeCommentPanel = () => {
    getForum().then(
      (res) => {
        console.log("论坛页面的内容", res);
      },
      (err) => {
        console.log("论坛页面的内容", err);
      }
    );
    // const a = [...data];
    // a.push({
    //   author: <span style={{ color: "white" }}>Han Solo</span>,
    //   avatar: "https://joeschmoe.io/api/v1/random",
    //   content: (
    //     <p className={s.commentContent}>
    //       We supply a series of design principles, practical patterns and high
    //       quality design resources (Sketch and Axure), to help people create
    //       their product prototypes beautifully and efficiently.
    //     </p>
    //   ),
    //   datetime: <div style={{ color: "#ccc" }}>2022-11-26 01:47:54</div>,
    // });
    // setData(a);
    setOpenComment(!openComment);
  };
  const handlescroll = (e) => {
    // console.log('e',e);
    // e.scroll
    let timer;
    const scrollTop = Math.round(e.scrollTop);
    console.log("e.scrollTop", e.scrollTop);

    const clientHeight = e.clientHeight;
    const scrollHeight = e.scrollHeight;
    console.log("scrollTop", scrollTop);
    console.log("clientHeight", clientHeight);
    console.log("scrollHeight", scrollHeight);
    // console.log("showLoading", showLoading);
    // console.log(scrollTop + clientHeight === scrollHeight);

    if (scrollTop + clientHeight === scrollHeight && !showLoading) {
      setShowLoading(true);
      console.log("触底了！！！");
      timer = setTimeout(()=>{
        console.log('加载完毕！！！');
        setShowLoading(false);
      },1000)
    } else {
      clearTimeout(timer);
      // console.log('这里执行了',showLoading );
      setShowLoading(false);
    }
  };
  useEffect(() => {
    if (showLoading) {
      const e = document.getElementById("commentList");
      if (e) {
        e.scrollTop = e.scrollTop + 70;
      }
    } else {
      console.log("变为false了");
    }
  }, [showLoading]);
  useEffect(() => {
    if (data2) {
      if(oldData2?.current?.createTime && oldData2?.current?.createTime === data2[0].creatTime){
        return;
      }
      
      const res = data2.map((data) => {
        return {
          author: (
            <span style={{ color: "white" }}>{data.author.username}</span>
          ),
          avatar: "https://joeschmoe.io/api/v1/random",
          content: <p className={s.commentContent}>{data.comment}</p>,
          datetime: <div style={{ color: "#ccc" }}>{data.creatTime}</div>,
        };
      });
      // console.log(eval(data2[0]));

      setData(res);
    }

    // console.log("此时data2变化为的内容为", data2);
    // setData(data2);
  }, [data2]);
  // 一个版面最多6条
  useEffect(() => {
    const commentList = document.getElementById("commentList");
    commentList?.addEventListener("scroll", () => {
      handlescroll(commentList);
    });
    let websocket;
    //关闭WebSocket连接
    function closeWebSocket() {
      if (websocket) {
        websocket.close();
      }
    }
    setTimeout(() => {
      console.log("ws连接");

      //判断当前浏览器是否支持WebSocket
      if ("WebSocket" in window) {
        //建立连接，这里的/websocket ，是Servlet中注解中的那个值
        // setTimeout(()=>{
        //   websocket = new WebSocket("ws://localhost:3000/socket/forum");
        // },500)
        websocket = new WebSocket(
          "ws://localhost:3000/wsSocket/wsSocket/forum"
        );
      } else {
        alert("当前浏览器 Not support websocket");
      }
      //连接发生错误的回调方法
      websocket.onerror = function () {
        console.log("WebSocket连接发生错误");
      };
      //连接成功建立的回调方法
      websocket.onopen = function () {
        if (websocket.readyState == 1) {
          console.log("连接成功,可以进行通讯");
          if(!timer){
            timer = setInterval(() => {
              console.log("执行了！！！");
              websocket.send(`interval message ${new Date()}`);
            }, 2000);
          }
          websocket.send("ID = 0x0001");
        } else {
          console.log("连接失败");
        }
      };
      //接收到消息的回调方法
      websocket.onmessage = function (event) {
        // console.log('data2',data2);
        // ?: 这里莫名奇妙的，不知道为什么传回来的json会报错？？？所以这里做了个收集报错的提醒
        try {
          if (event.data) {
            setData2(JSON.parse(event.data));
          }
        } catch (err) {}

        // console.log(event.data);
        if (event.data === "1") {
          console.log("数据更新啦");
        }
      };
      //连接关闭的回调方法
      websocket.onclose = function () {
        console.log("WebSocket连接关闭");
        clearInterval(timer);
      };
      //监听窗口关闭事件，当窗口关闭时，主动去关闭WebSocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = function () {
        console.log("这里出发了222");
        clearInterval(timer);
        closeWebSocket();
      };
    }, 200);

    return () => {
      console.log("这里出发了111");
      clearInterval(timer);
      closeWebSocket();
    };
  }, []);

  return (
    <div className={s.forumContainer}>
      <div style={{ position: "absolute" }} onClick={takeCommentPanel}>
        haha
      </div>
      <div className={s.addCommentContainer}>
        <TextArea
          className={`${s.comment} ${openComment ? "" : s.closeComment}`}
          rows={4}
        />
      </div>
      <div className={s.listContainer} id="commentList" >
        <List
          className="comment-list comment-container"
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <li>
              <Comment
                // className=""
                // actions={item.actions}
                author={item.author}
                avatar={item.avatar}
                content={item.content}
                datetime={item.datetime}
              />
            </li>
          )}
        />
        {
          <Fragment>
            {showLoading && <div className={s.loading}>加载中……</div>}
          </Fragment>
        }
      </div>
    </div>
  );
}
