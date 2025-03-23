import { RiSendPlaneFill } from "react-icons/ri";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { SocketContext } from "../../NewGroupInterface";
import { GetChatService } from "../../../../../../services/GroupService";

const Chat = () => {
  const dispatch = useDispatch();
  const context = useContext(SocketContext);

  const [myMessage, setMyMessage] = useState("");
  const [typing, setTyping] = useState(false);
  //   const [messages, setMessages] = useState([]);
  const messages = useSelector((state) => state?.group?.messages);

  const sendMessage = (e) => {
    e.preventDefault();
    if (myMessage !== "")
      context.socket.emit("chat", {
        message: myMessage,
        by:
          context.user &&
          context.user.details &&
          context.user.details.name.split(" ")[0],
        uid: context.user && context.user.details && context.user.details._id,
      });
    setMyMessage("");
  };

  const chatBox = useRef();

  const getMessages = async () => {
    const res = await GetChatService();
  };

  useEffect(() => {}, []);

  useEffect(() => {
    context.socket.on("chat-sent", (data) => {
      let msg;
      if (context.user.details._id === data.uid) {
        msg = { ...data, type: "sent" };
      } else {
        msg = { ...data, type: "received" };
      }
      dispatch({
        type: "SEND_MESSAGE",
        payload: msg,
      });
    });
  }, []);

  const userTyping = (e) => {
    setMyMessage(e.target.value);
    context.socket.emit("type", {
      msg: e.target.value,
      by:
        context.user &&
        context.user.details &&
        context.user.details.name.split(" ")[0],
      uid: context.user && context.user.details && context.user.details._id,
    });
  };

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
                  {messages
                    .slice(0)
                    .reverse()
                    .map((message, i) => {
                      if (message.type === "sent") {
                        return (
                          <div
                            className="d-flex justify-content-end "
                            style={{ marginBottom: "1.6rem" }}
                            key={i}
                            ref={chatBox}
                          >
                            <div className="msg_cotainer_send">
                              {message.message}
                              <span className="msg_time_send">
                                9:05 AM, Today
                              </span>
                            </div>
                            <img
                              alt="Sender Profile"
                              src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                              className="rounded-circle user_img_msg"
                            />
                          </div>
                        );
                      } else {
                        return (
                          <div className="d-flex justify-content-start mb-4">
                            <div className="img_cont_msg">
                              {i > 0 ? (
                                messages[i - 1].by !== message.by && (
                                  <img
                                    alt="Receiver Profile"
                                    src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                                    className="rounded-circle user_img_msg"
                                  />
                                )
                              ) : (
                                <img
                                  alt="Receiver Profile"
                                  src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                                  className="rounded-circle user_img_msg"
                                />
                              )}
                            </div>
                            <div className="msg_cotainer">
                              {i > 0 ? (
                                messages[i - 1].by !== message.by && (
                                  <p className="sent__by">{message.by}</p>
                                )
                              ) : (
                                <p className="sent__by">{message.by}</p>
                              )}
                              {message.message}
                              <span className="msg_time">9:07 AM, Today</span>
                            </div>
                          </div>
                        );
                      }
                    })}
                  {typing && <p id="typing">Someone is typing...</p>}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              <div className="card-footer">
                <form className="input-group" onSubmit={(e) => sendMessage(e)}>
                  {/* <div className="input-group-append">
                <span className="input-group-text attach_btn">
                  <i className="fas fa-paperclip"></i>
                </span>
              </div> */}
                  <input
                    style={{ height: "100%" }}
                    className="form-control type_msg"
                    placeholder="Type your message..."
                    value={myMessage}
                    onChange={(e) => userTyping(e)}
                  ></input>
                  <div
                    className="input-group-append"
                    onClick={(e) => sendMessage(e)}
                  >
                    <span className="input-group-text send_btn">
                      <RiSendPlaneFill />
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
