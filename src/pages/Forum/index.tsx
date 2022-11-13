import React, { useEffect, Fragment, useRef, useState } from "react";
import { Avatar, Comment, Tooltip, List, Form, Input, Button } from "antd";
import { getForum } from "src/api";
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
  const [openComment, setOpenComment] = useState(false);
  // 一个版面最多6条
  const Editor = ({ onChange, onSubmit, submitting, value }: EditorProps) => (
    <Fragment>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          Add Comment
        </Button>
      </Form.Item>
    </Fragment>
  );
  useEffect(() => {
    getForum().then(
      (res) => {
        console.log("论坛页面的内容", res);
      },
      (err) => {
        console.log("论坛页面的内容", err);
      }
    );
    let websocket;
    let timer;
    //判断当前浏览器是否支持WebSocket
    if ("WebSocket" in window) {
      //建立连接，这里的/websocket ，是Servlet中注解中的那个值
      websocket = new WebSocket("ws://localhost:3000/socket/forum");
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
        // timer = setInterval(() => {
        //   console.log("执行了！！！");
        //   websocket.send(`interval message ${new Date()}`);
        // }, 2000);
        // websocket.send("ID = 0x0001")
      } else {
        console.log("连接失败");
      }
    };
    //接收到消息的回调方法
    websocket.onmessage = function (event) {
      console.log(event.data);
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
      clearInterval(timer);
      closeWebSocket();
    };
    //关闭WebSocket连接
    function closeWebSocket() {
      websocket.close();
    }
    return () => {
      clearInterval(timer);
      closeWebSocket();
    };
  }, []);

  return (
    <div className={s.forumContainer}>
      <div
        style={{ position: "absolute" }}
        onClick={() => {
          const a = [...data];
          a.push({
            author: <span style={{ color: "white" }}>Han Solo</span>,
            avatar: "https://joeschmoe.io/api/v1/random",
            content: (
              <p className={s.commentContent}>
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure), to help people
                create their product prototypes beautifully and efficiently.
              </p>
            )
          });
          setData(a);
          setOpenComment(!openComment);
        }}
      >
        haha
      </div>
      <div className={s.addCommentContainer}>
        <TextArea className={`${s.comment} ${openComment ? '': s.closeComment}`} rows={4} />
      </div>
      <div className={s.listContainer}>
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
                // datetime={item.datetime}
              />
            </li>
          )}
        />
      </div>
    </div>
  );
}
