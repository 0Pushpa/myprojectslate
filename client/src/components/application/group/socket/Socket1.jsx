import React, { useEffect, useRef, useState, useContext } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import micmute from "../../../../assets/logo/slate.PNG";
import micunmute from "../../../../assets/logo/slate.PNG";
import webcam from "../../../../assets/logo/slate.PNG";
import webcamoff from "../../../../assets/logo/slate.PNG";
import { apiEndpoint } from "../../../../constant/endpoint";
import { useParams } from "react-router-dom";
import { SocketContext } from "../../../application/group/GroupInterface";
import Video from "./Video";
import { Box } from "@material-ui/core";
import { AiOutlineAudioMuted, AiOutlineAudio } from "react-icons/ai";
import { FiVideo, FiVideoOff } from "react-icons/fi";
import Participants from "components/application/group/call-interface/participants/Participants";
import VideoLoader from "../../../Loader/VideoLoader";

const Container = styled.div`
  height: 100vh;
  width: 20%;
`;

const Controls = styled.div`
  margin: 3px;
  padding: 5px;
  height: 27px;
  width: 98%;
  margin-top: -8.5vh;
  filter: brightness(1);
  z-index: 1;
  border-radius: 6px;
  visibility: hidden;
`;

const ControlSmall = styled.div`
  margin: -4.5px;
  padding: 5px;
  height: 16px;
  width: 98%;
  margin-top: -6vh;
  filter: brightness(1);
  z-index: 1;
  border-radius: 6px;
  display: flex;
  justify-content: center;
`;

const ImgComponent = styled.img`
  cursor: pointer;
  height: 25px;
`;

const ImgComponentSmall = styled.img`
  height: 15px;
  text-align: left;
  opacity: 0.5;
`;

const StyledVideo = styled.video`
  width: 100%;
  overflow: hidden;
  z-index: 99;
`;

// const Video = ({ peer }) => {
//   const ref = useRef();
//   // props.peer.on("stream", (stream) => {
//   //   console.log("video ko props", props);
//   // });
//   console.log("video hai");

//   useEffect(() => {
//     console.log("my peer", peer);
//     peer.peer.on("stream", (stream) => {});
//   }, [peer]);

//   return <StyledVideo id="kcha" playsInline autoPlay ref={ref} />;
// };

const Room = (props) => {
  const [peers, setPeers] = useState([]);
  // const [audioFlag, setAudioFlag] = useState(true);
  // const [videoFlag, setVideoFlag] = useState(true);
  const [userUpdate, setUserUpdate] = useState([]);

  const socketRef = useRef();
  const peersRef = useRef([]);
  const params = useParams();
  const roomID = params.id;
  const senders = useRef([]);

  const peerRef = useRef();

  const videoConstraints = {
    minAspectRatio: 1.333,
    minFrameRate: 60,
    height: window.innerHeight / 1.8,
    width: window.innerWidth / 2,
  };
  const context = useContext(SocketContext);

  useEffect(() => {
    socketRef.current = context.socket;
    createStream();
  }, []);

  function createStream() {
    navigator.mediaDevices
      .getUserMedia({
        video: videoConstraints,
        audio: true,
      })
      .then((stream) => {
        props.userVideo.current.srcObject = stream;
        socketRef.current.emit("join room", {
          roomID,
          uid: context.user.details._id,
          name: context.user.details.name,
        });
        socketRef.current.on("total users", ({ users, usersInThisRoom }) => {
          console.log("user in room : ", usersInThisRoom);
          console.log("all users call vako");
          const peers = [];
          // senders.current = stream;
          usersInThisRoom &&
            usersInThisRoom.forEach((userID) => {
              const peer = createPeer(
                userID.socketId,
                socketRef.current.id,
                stream
              );
              peerRef.current = peer;

              props.userVideo.current.srcObject
                .getTracks()
                .forEach((track, index) => {
                  // console.log("track", track);
                  // console.log("users", props.userVideo.current.srcObject);
                  // console.log("peersRef", peerRef.current);
                  // console.log(
                  //   "peers streams",
                  //   peerRef.current.streams[0].getTracks()
                  // );
                  // peerRef.current.removeTrack(
                  //   peerRef.current.streams[0].getTracks()[0],
                  //   props.userVideo.current.srcObject
                  // );
                  peerRef.current.replaceTrack(
                    peerRef.current.streams[0].getTracks()[index],
                    track,
                    props.userVideo.current.srcObject
                  );
                  console.log("peers", peerRef.current);
                });
              senders.current = peerRef.current.streams[0];

              // currentPeer;
              // console.log("peer -- ol", props.userVideo.current.srcObject);

              peersRef.current.push({
                peerID: userID.socketId,
                peer,
                userId: userID.user,
                userName: userID.name,
              });
              peers.push({
                peerID: userID.socketId,
                peer,
                userId: userID.user,
                userName: userID.name,
              });
            });
          setPeers(peers);
        });
        socketRef.current.on("user joined", (payload) => {
          console.log("payload", payload);
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peer.signal(payload.signal);

          // peer.signal(payload.signal);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
            userId: payload.user,
            userName: payload.name,
          });
          const peerObj = {
            peer,
            peerID: payload.callerID,
            userId: payload.user,
            userName: payload.name,
          };
          setPeers((users) => [...users, peerObj]);
        });

        socketRef.current.on("user left", (id) => {
          const peerObj = peersRef.current.find((p) => p.peerID === id);

          if (peerObj) {
            peerObj.peer.destroy();
          }
          const peers = peersRef.current.filter((p) => p.peerID !== id);
          peersRef.current = peers;
          setPeers(peers);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });

        socketRef.current.on("change", (payload) => {
          setUserUpdate(payload);
        });
      });
  }

  useEffect(() => {
    props.screenSharing && shareScreen();
  }, [props.screenSharing]);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    // props.userVideo.current.srcObject
    //   .getTracks()
    //   .forEach((track) =>
    //     senders.current.push(
    //       peersRef.current
    //         .find((peer) => peer.peerID === userToSignal)
    //         .current.addTrack(track, props.userStream.current)
    //     )
    //   );

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
        uid: context.user.details._id,
        name: context.user.details.name,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    return peer;
  }

  function shareScreen() {
    navigator.mediaDevices.getDisplayMedia({ cursor: true }).then((stream) => {
      const screenTrack = stream.getTracks()[0];
      console.log("Str", peerRef.current.streams[0]);
      peersRef.current.removeStream(peerRef.current);
      peersRef.current.addStream(stream);
      senders.current.removeTrack(
        senders.current.getTracks().find((sender) => sender.kind === "video"),
        senders.current
      );
      // senders.current.addTrack(screenTrack, senders.current);

      // screenTrack.onended = function () {
      //   senders.current
      //     .find((sender) => sender.track.kind === "video")
      //     .replaceTrack(props.userVideo.current.getTracks()[1]);
      // };
    });
  }

  return (
    <Container
      className="video-wrapper"
      style={{
        width: "100%",
        visibility: props.isBoardOpen ? "hidden" : "visible",
        position: props.isBoardOpen ? "absolute" : "relative",
        gridTemplateColumns:
          peers.length > 0 ? "repeat(2,1fr)" : "repeat(1,1fr)",
      }}
    >
      <Box
        overflow="hidden"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignContent="center"
        position="relative"
      >
        <VideoLoader />

        <StyledVideo
          muted
          ref={props.userVideo}
          autoPlay
          playsInline
          className={!props.videoFlag && "hide-video"}
          style={{
            height: peers.length > 0 ? "50vh" : "auto",
            objectFit: "contain",
          }}
        />

        {!props.videoFlag && (
          <Participants
            participant={{
              userId: context.user.details._id,
              userName: context.user.details.name,
            }}
          />
        )}

        <Controls>
          <ImgComponent
            ref={props.videoButtonRef}
            src={props.videoFlag ? webcam : webcamoff}
            onClick={() => {
              if (props.userVideo.current.srcObject) {
                props.userVideo.current.srcObject
                  .getTracks()
                  .forEach(function (track) {
                    if (track.kind === "video") {
                      if (track.enabled) {
                        socketRef.current.emit("change", [
                          ...userUpdate,
                          {
                            id: socketRef.current.id,
                            videoFlag: false,
                            audioFlag: props.audioFlag,
                          },
                        ]);
                        track.enabled = false;
                        props.closeVideo();
                      } else {
                        socketRef.current.emit("change", [
                          ...userUpdate,
                          {
                            id: socketRef.current.id,
                            videoFlag: true,
                            audioFlag: props.audioFlag,
                          },
                        ]);
                        track.enabled = true;
                        props.openVideo();
                      }
                    }
                  });
              }
            }}
          />
          &nbsp;&nbsp;&nbsp;
          <ImgComponent
            ref={props.audioButtonRef}
            src={props.audioFlag ? micunmute : micmute}
            onClick={() => {
              if (props.userVideo.current.srcObject) {
                props.userVideo.current.srcObject
                  .getTracks()
                  .forEach(function (track) {
                    if (track.kind === "audio") {
                      if (track.enabled) {
                        socketRef.current.emit("change", [
                          ...userUpdate,
                          {
                            id: socketRef.current.id,
                            videoFlag: props.videoFlag,
                            audioFlag: false,
                          },
                        ]);
                        track.enabled = false;
                        props.closeAudio();
                      } else {
                        socketRef.current.emit("change", [
                          ...userUpdate,
                          {
                            id: socketRef.current.id,
                            videoFlag: props.videoFlag,
                            audioFlag: true,
                          },
                        ]);
                        track.enabled = true;
                        props.openAudio();
                      }
                    }
                  });
              }
            }}
          />
        </Controls>
      </Box>
      {console.log("myyyyyyyyyyyy", peers)}
      {peers.map((peer, index) => {
        if (index < 4) {
          let audioFlagTemp = true;
          let videoFlagTemp = true;
          if (userUpdate) {
            userUpdate.forEach((entry) => {
              if (peer && peer.peerID && peer.peerID === entry.id) {
                audioFlagTemp = entry.audioFlag;
                videoFlagTemp = entry.videoFlag;
              }
            });
          }
          return (
            <Box key={peer.peerID} overflow="hidden">
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignContent="center"
                position="relative"
                style={{ height: "100%" }}
                zIndex={99}
              >
                <VideoLoader />
                <div
                  style={{
                    zIndex: "99",
                    position: "relative",
                  }}
                  className={!videoFlagTemp && "hide-video"}
                >
                  <Video peer={peer} />
                </div>
                {!videoFlagTemp && <Participants participant={peer} />}
                <ControlSmall>
                  {videoFlagTemp ? <FiVideo /> : <FiVideoOff />}
                  &nbsp;&nbsp;&nbsp;
                  {audioFlagTemp ? <AiOutlineAudio /> : <AiOutlineAudioMuted />}
                </ControlSmall>
              </Box>
            </Box>
          );
        }
      })}
    </Container>
  );
};

export default Room;
