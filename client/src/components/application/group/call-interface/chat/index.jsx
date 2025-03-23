import { RiSendPlaneFill } from "react-icons/ri";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import InputEmoji from "react-input-emoji";
import { SocketContext } from "../../GroupInterface";
import { useParams } from "react-router-dom";
import DateFormatter from "../../../../../utils/DateFormatter";
import { Avatar } from "@material-ui/core";
import gsap from "gsap";
import SentMessage from "./Renderer/SentMessage";
import {
  ChatService,
  GetChatService,
} from "../../../../../services/GroupService";
import ReceivedMessage from "./Renderer/ReceivedMessage";

const Chat = () => {
  const dispatch = useDispatch();
  const context = useContext(SocketContext);
  const params = useParams();

  const [myMessage, setMyMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);

  const messages = useSelector((state) => state.messages.messages || []);

  const messageService = async () => {
    const res = await ChatService({
      FromID: context?.user?.details._id,
      ToID: params.id,
      userName: context?.user?.details.name,
      message: myMessage,
      messageType: "message",
      status: true,
    });
    if (res?.data?.status === "success") {
      context.socket.emit("chat", {
        message: myMessage,
        by: context?.user?.details.name,
        uid: context?.user?.details._id,
        groupId: params.id,
        messageType: "message",
        sent_at: new Date().toLocaleString(),
      });
    }
  };

  const sendMessage = () => {
    if (myMessage !== "") {
      messageService();
    }
    setMyMessage("");
  };

  const getMessages = async () => {
    setLoading(true);
    const res = await GetChatService(params.id);
    if (res?.status === 200) {
      const data = res?.data?.messages.map((el) => {
        return {
          message: el.message,
          by: el.userName,
          uid: el.FromID,
          groupId: el.ToID,
          sent_at: el.createdAt.toLocaleString(),
          messageType: el?.messageType,
          type:
            el?.messageType === "notification"
              ? "notification"
              : context?.user?.details?._id === el.FromID
              ? "sent"
              : "received",
        };
      });
      dispatch({
        type: "GET_MESSAGES",
        payload: data,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    context.socket.on("chat-sent", (data) => {
      let msg;
      if (data?.messageType === "message") {
        if (context.user.details._id === data.uid) {
          msg = { ...data, type: "sent" };
        } else {
          msg = { ...data, type: "received" };
        }
      } else {
        msg = {
          ...data,
          type: "notification",
        };
      }

      dispatch({
        type: "SEND_MESSAGE",
        payload: msg,
      });
    });
  }, []);

  const userTyping = () => {
    context.socket.emit("type", {
      msg: myMessage,
      by: context.user && context.user.details && context.user.details.name,
      uid: context.user && context.user.details && context.user.details._id,
    });
  };

  useEffect(() => {
    if (myMessage !== "") {
      userTyping();
    }
  }, [myMessage]);

  context.socket.on("someone-typing", (data) => {
    if (data.uid !== context.user.details._id) {
      setTyping(true);
    }
  });

  context.socket.on("stoped-typing", () => {
    setTyping(false);
  });

  // useEffect(() => {
  //   context.socket.emit("context.user-joined", {
  //     context.userName: context.user && context.user.details && context.user.details.name,
  //     context.userId: context.user && context.user.details && context.user.details._id,
  //   });
  // }, []);

  // context.socket.on("currentUsers", (data) => {
  //   console.log(data);
  //   dispatch({
  //     type: "AVAILABLE_PARTICIPANTS",
  //     payload: data,
  //   });
  // });

  // useEffect(() => {
  //   chatBox?.current.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  //   context.socket.on("chat", (data) => {
  //     // let recentMessage;
  //     // if (data.uid === context.user.details.id) {
  //     //   recentMessage = { ...data, type: "sent" };
  //     // } else {
  //     //   recentMessage = { ...data, type: "received" };
  //     // }
  //     // console.log(recentMessage);
  //     // setMessages([...messages, data]);
  //   });
  const messagesEndRef = useRef(null);

  return (
    <div className="chat__section">
      <div className="chat__interface">
        <div className="container-fluid h-100">
          <div className="row justify-content-center h-100">
            <div className="col-md-12 chat">
              <div className="card" style={{ position: "relative" }}>
                <div className="card-body msg_card_body">
                  {!loading &&
                    messages
                      .slice(0)
                      .reverse()
                      .map((message, i) => {
                        if (message.type === "sent") {
                          return <SentMessage i={i} message={message} />;
                        } else if (message.type === "received") {
                          return (
                            <ReceivedMessage
                              i={i}
                              messages={messages}
                              message={message}
                            />
                          );
                        } else {
                          return (
                            <div
                              className="d-flex justify-content-center"
                              key={i}
                              style={{
                                fontSize: "0.85rem",
                                color: "#575757",
                              }}
                            >
                              {message.message}
                            </div>
                          );
                        }
                      })}
                  {typing && <p id="typing">Someone is typing...</p>}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              <div className="card-footer">
                <div className="input-group">
                  {/* <div className="input-group-append">
                <span className="input-group-text attach_btn">
                  <i className="fas fa-paperclip"></i>
                </span>
              </div> */}
                  <InputEmoji
                    value={myMessage}
                    onChange={setMyMessage}
                    cleanOnEnter
                    onEnter={sendMessage}
                    placeholder="Type a message"
                  />

                  <div
                    className="input-group-append"
                    onClick={(e) => sendMessage(e)}
                  >
                    <span className="input-group-text send_btn">
                      <RiSendPlaneFill />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
