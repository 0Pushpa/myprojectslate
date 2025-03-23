// import React, { useContext, useEffect, useState } from "react";
// import { BsFillMicFill } from "react-icons/bs";
// import { FaChalkboardTeacher, FaVideo } from "react-icons/fa";
// import { MdCallEnd } from "react-icons/md";
// import { SiGooglemessages } from "react-icons/si";
// // import { useDispatch } from "react-redux";
// import { useParams } from "react-router";
// import "../../../../../assets/css/chat.css";
// // import Room from "../../../../application/socket/SocketContext";
// import DrawApp from "../../../../drawing_board/DrawBoard";
// import { SocketContext } from "../NewGroupInterface";
// import { VideoCallContext } from "../VideoContext";
// import Chat from "./Chat/Chat";
// const CallInterface = ({ show }) => {
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [isBoardOpen, setShowBoard] = useState(false);
//   const [isVideoOpen, setVideoOpen] = useState(false);
//   // const [operations, setOperations] = useState([]);

//   const context = useContext(SocketContext);
//   const vContext = useContext(VideoCallContext);

//   // const dispatch = useDispatch();

//   const openChat = () => {
//     setIsChatOpen(!isChatOpen);
//   };

//   const showBoard = () => {
//     context.socket.emit("open-board", {
//       username: context.user.details.name,
//     });
//     setShowBoard(!isChatOpen);
//   };

//   const endCall = () => {
//     context.socket.emit("user-leave", {
//       groupId: params.id,
//       uid: context.user.details._id,
//     });
//     // context.userVideo.current.stop();
//     console.log(context.userVideo.current);
//     let stream = context.userVideo.current.srcObject;
//     const tracks = stream.getTracks();
//     tracks.forEach((track) => track.stop());
//     context.userVideo.current.srcObject = null;
//     context.toggleCall();
//   };

//   const openVideo = () => {
//     setVideoOpen(!isVideoOpen);
//   };

//   const params = useParams();

//   const [participants, setParticipants] = useState([]);

//   context.socket.on("currentUsers", (data) => {
//     setParticipants(data);
//   });

//   useEffect(() => {
//     context.socket.emit("user-joined", {
//       userName:
//         context.user && context.user.details && context.user.details.name,
//       userId: context.user && context.user.details && context.user.details._id,
//       video: true,
//       audio: true,
//       groupId: params.id,
//     });
//   }, [context.socket, context.user, params]);

//   context.socket.on("board-opened", () => {
//     setShowBoard(true);
//   });

//   return (
//     <>
//       <div className={`call__interface ${show && "show"}`} id="call__interface">
//         {!isBoardOpen ? (
//           <>
//             <div className="call__component">
//               <Room />
//               <div className="call__section">
//                 {/* <Participants
//                   users={participants}
//                   isVideoOpen={isVideoOpen}
//                 ></Participants> */}

//                 <div className="call__button__wrapper">
//                   <ul>
//                     <li>
//                       <div
//                         className={`call__actions__icons small ${
//                           isBoardOpen && "active"
//                         }`}
//                         onClick={showBoard}
//                       >
//                         <FaChalkboardTeacher />
//                       </div>
//                     </li>
//                     <li>
//                       <div className="call__actions__icons small">
//                         <BsFillMicFill />
//                       </div>
//                     </li>
//                     <li>
//                       <div
//                         className="call__actions__icons large "
//                         onClick={endCall}
//                       >
//                         <MdCallEnd />
//                       </div>
//                     </li>
//                     <li>
//                       <div
//                         className="call__actions__icons small"
//                         onClick={openVideo}
//                       >
//                         <FaVideo />
//                       </div>
//                     </li>
//                     <li>
//                       <div
//                         className={`call__actions__icons small ${
//                           isChatOpen && "active"
//                         }`}
//                         onClick={openChat}
//                       >
//                         <SiGooglemessages />
//                       </div>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             {/*Chat section */}
//             {isChatOpen && <Chat />}
//           </>
//         ) : (
//           <DrawApp context={context} />
//         )}
//       </div>
//     </>
//   );
// };

// export default CallInterface;
