import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PhoneIcon from "@material-ui/icons/Phone";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useParams } from "react-router";
import Peer from "simple-peer";
import io from "socket.io-client";
import { createContext } from "react";
import { apiEndpoint } from "../../../../constant/endpoint";
import CallInterface from "./CallInterface/CallInterface";
import { SocketContext } from "./NewGroupInterface";

export const VideoCallContext = createContext();

function VideoContext({ show }) {
  const params = useParams();

  const socket = io.connect(apiEndpoint + "/", {
    query: {
      roomName: params.id,
    },
  });
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const context = useContext(SocketContext);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        console.log(stream);
        myVideo.current.srcObject = stream;
      });

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: context.user.details._id,
        name: context.user.details.name,
      });
      console.log(data);
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      console.log(stream);
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    console.log(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <VideoCallContext.Provider
      value={{
        me,
        stream,
        receivingCall,
        caller,
        callerSignal,
        callAccepted,
        idToCall,
        callEnded,
        callUser,
        name,
        myVideo,
        userVideo,
        connectionRef,
        answerCall,
      }}
    >
      <CallInterface show={show} />
    </VideoCallContext.Provider>
  );
}

export default VideoContext;
