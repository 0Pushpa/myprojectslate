import React, { useState, useEffect, createContext, useRef } from "react";
import { FiChevronLeft, FiPlus, FiVideo } from "react-icons/fi";
import Contactimg1 from "../../../../assets/images/portfolio/conatctimg1.jpg";
import CreateChannelModal from "./CreateChannelModal";
import CallInterface from "./CallInterface/CallInterface";
import Chat from "./CallInterface/Chat/Chat";
import { useHistory, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { apiEndpoint } from "../../../../constant/endpoint";
import Peer from "simple-peer";
import Modal from "../../../elements/CallingModal";
import context from "react-bootstrap/esm/AccordionContext";

export const SocketContext = createContext();

export const NewGroupInterface = () => {
  const params = useParams();

  const socket = io.connect(apiEndpoint + "/", {
    query: {
      roomName: params.id,
    },
  });
  const user = useSelector((state) => state.user);

  const [show, setShow] = useState(false);
  const [callModal, setCallModal] = useState(false);
  const [openCall, setOpenCall] = useState(false);
  const [joinCall, setJoinCall] = useState([]);
  const [stream, setStream] = useState();
  const [caller, setCaller] = useState();
  const [isCaller, setIsCaller] = useState(false);

  const settingStream = (data) => {
    setStream(data);
  };

  const joinCallRef = useRef(false);

  const closeModal = () => {
    setCallModal(false);
    setOpenCall(true);
  };

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    if (isCaller) setMyStream();
  }, [stream]);

  const setMyStream = () => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("group-call", {
        groupToCall: params.id,
        from: user.details._id,
        name: user.details.name,
        signalData: data,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      // setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const startCall = () => {
    setOpenCall(true);
    setIsCaller(true);
  };

  const endCall = () => {
    setOpenCall(false);
  };

  const toggleCall = () => {
    setOpenCall(!openCall);
  };

  useEffect(() => {
    const id = params.id;
    fetchData(id);
  }, [params]);

  useEffect(() => {
    socket.emit("currentUsers");
  }, [socket]);

  // socket.on("currentUsers", (users) => {
  //   console.log(users);
  // });

  const fetchData = (id) => {
    console.log(id);
  };

  const toggleCallModal = async () => {
    setCallModal(!callModal);
    await setTimeout(() => {
      setCallModal(false);
    }, 100000);
  };

  const showModal = () => {
    setShow(!show);
  };

  const callAccepted = () => {
    closeModal();
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    console.log(caller.signal);

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data });
    });

    console.log(userVideo);

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(caller.signal);

    connectionRef.current = peer;
  };

  useEffect(() => {
    socket.on("incoming-call", (data) => {
      setCaller(data);
      const joinedUser = data.users.some((u) => {
        return u.uid === user.details._id;
      });
      if (data.data.from !== user.details._id && !joinedUser) toggleCallModal();
    });
  }, [socket, user.details._id]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        user,
        toggleCall,
        callModal,
        toggleCallModal,
        connectionRef,
        userVideo,
        stream,
        caller,
      }}
    >
      {/* <div className="group-wrapper"> */}
      <div className="channel-creation-flex">
        <div className="channel-creation">
          <div className="channel-creation-nav">
            <span className="back" onClick={goBack}>
              <FiChevronLeft />
            </span>
            <span className="create-channel-button" onClick={showModal}>
              <span className="create-channel-icon">
                <FiPlus />
              </span>
              <h3 className="create-channel-button-h3">Create channel</h3>
            </span>
          </div>
          <div className="create-channel-group">
            <img
              alt="cimage"
              src={Contactimg1}
              className="create-channel-group-img"
            />
            <h3>Group Name</h3>
          </div>
          <div className="channel-name-display">
            <ul>
              <li>#General</li>
              <li>#General</li>
            </ul>
          </div>
        </div>
        <div className="channel-chat-main">
          <div className="channel-right-nav">
            <div className="channel-general-nav">
              <span className="c-g-n-imgspan">
                <img alt="cimage" src={Contactimg1} className="c-g-n-img"></img>
              </span>
              <span className="c-g-n-text">
                <ul>
                  <li>General</li>
                  <li>Posts</li>
                  <li>Files</li>
                </ul>
              </span>
            </div>
            <div className="c-g-n-mid"></div>
            {!joinCall ? (
              <div className="channel-videochat-nav" onClick={startCall}>
                <span className="channel-videochat-icon">
                  <FiVideo />
                </span>
                <h3 className="channel-videochat-text">Join Meeting</h3>
              </div>
            ) : (
              <div className="channel-videochat-nav" onClick={startCall}>
                <span className="channel-videochat-icon">
                  <FiVideo />
                </span>
                <h3 className="channel-videochat-text">Start a meet</h3>
              </div>
            )}
          </div>
          <div className="chat-wrapper">
            <Chat />
          </div>
        </div>
        {openCall && (
          <CallInterface
            show={openCall}
            myVideo={myVideo}
            settingStream={settingStream}
            userVideo={userVideo}
          />
        )}
      </div>
      <Modal
        socket={socket}
        toggleCallModal={toggleCallModal}
        callModal={callModal}
        connectionRef={connectionRef}
        userVideo={userVideo}
        stream={stream}
        caller={caller}
        closeModal={closeModal}
        callAccepted={callAccepted}
      />
      <CreateChannelModal show={show} showModal={showModal} />
      {/* </div> */}
    </SocketContext.Provider>
  );
};
