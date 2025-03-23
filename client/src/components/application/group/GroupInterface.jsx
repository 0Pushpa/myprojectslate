import { Box, IconButton } from "@material-ui/core";
import Menu from "@material-ui/icons/InfoOutlined";
import React, { createContext, useEffect, useRef, useState } from "react";
import { FiVideo } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Peer from "simple-peer";
import { io } from "socket.io-client";
import { apiEndpoint } from "../../../constant/endpoint";
// import Room from "../../../application/socket/SocketContext";
import Backbutton from "../../elements/BackButton";
import Modal from "../../elements/CallingModal";
import Page from "../../page";
// import CreateChannelModal from "./CreateChannelModal";
import CallInterface from "./call-interface/CallInterface";
import Chat from "./call-interface/chat";
import InviteUsersModal from "./group-modal/InviteUsers";
import GroupSideMenu from "./GroupSideMenu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { useDispatch } from "react-redux";
import {
  IndividualGroupService,
  VerifyUsersAccessibilityService,
} from "../../../services/GroupService";
import { MainSocketContext } from "../Frontendmain";
import { AiOutlineFileText } from "react-icons/ai";
import FileUploader from "./file-uploader/Files";
import FilesDisplay from "./file-uploader/FilesDisplay";
import Live from "../../elements/Live";
import CallMergeIcon from "@material-ui/icons/CallMerge";
import CallIcon from "@material-ui/icons/Call";
import { useLocation } from "react-router-dom";
import {
  DownloadReportFileService,
  GetReportsService,
} from "../../../services/AttendenceService";
import { BsChatSquareDots } from "react-icons/bs";
import { HiOutlineDocumentReport } from "react-icons/hi";

export const SocketContext = createContext();

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const NewGroupInterface = () => {
  const params = useParams();
  const query = useQuery();

  const user = useSelector((state) => state.user);

  const mainContext = React.useContext(MainSocketContext);

  const socket = mainContext.socket;

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [callModal, setCallModal] = useState(false);
  const [openCall, setOpenCall] = useState(false);
  const [joinCall, setJoinCall] = useState([]);
  const [stream, setStream] = useState();
  const [caller, setCaller] = useState();
  const [isCaller, setIsCaller] = useState(false);
  const [group, setGroup] = useState({});
  const [creator, setCreator] = useState({});
  const [usersInCall, setUsersInCall] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  const closeModal = () => {
    setCallModal(false);
    setOpenCall(true);
  };

  useEffect(() => {
    if (query.get("call")) {
      setOpenCall(true);
    }
  }, [query]);

  const userVideo = useRef();
  const connectionRef = useRef();

  const history = useHistory();

  const verifyUserAccessibility = async () => {
    const res = await VerifyUsersAccessibilityService({
      userId: user?.details?._id,
      groupId: params.id,
    });
    if (res?.data?.status === "success") {
      getGroupInfo();
    } else {
      history.push("/404");
    }
  };

  useEffect(() => {
    socket.on("all users", ({ users, usersInThisRoom }) => {
      setUsersInCall(users);
    });
  }, [socket]);

  useEffect(() => {
    if (history.action === "POP") {
      verifyUserAccessibility();
    } else {
      params && getGroupInfo();
    }
  }, [params, history]);

  useEffect(() => {
    socket.on("call users", (payload) => {
      if (payload.uid !== user.details._id) {
        dispatch({
          type: "INCOMING_CALL",
          payload,
        });
      }
    });
  }, [dispatch, socket, user.details._id]);

  socket.on("update members", (payload) => {
    setTotalUsers(totalUsers + 1);
    setUsers([
      ...users,
      {
        _id: payload.uid,
        name: payload.by,
      },
    ]);
  });

  socket.on("remove members", (payload) => {
    setTotalUsers(totalUsers - 1);
    const filterUser = users.filter((user) => user._id !== payload.uid);
    setUsers(filterUser);
  });

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
  };

  const toggleCall = () => {
    setOpenCall(!openCall);
  };

  useEffect(() => {
    socket.emit("currentUsers");
  }, [socket]);

  const toggleCallModal = async () => {
    setCallModal(!callModal);
    await setTimeout(() => {
      setCallModal(false);
    }, 100000);
  };

  const showModal = () => {
    setShow(!show);
  };

  useEffect(() => {
    socket.on("incoming-call", (data) => {
      setCaller(data);
      const joinedUser = data.users.some((u) => {
        return u.uid === user.details._id;
      });
      if (data.data.from !== user.details._id && !joinedUser) toggleCallModal();
    });
  }, []);

  const getGroupInfo = async () => {
    setIsLoading(true);
    const res = await IndividualGroupService(params.id);
    if (res?.data?.group) {
      setGroup(res.data.group);
      let members = [];
      res.data.totalUsers.map((u) => {
        if (u.UserID._id === res.data.group.createdBy) {
          setCreator(u.UserID);
        } else {
          members.push(u.UserID);
        }
      });
      console.log("Res", res.data);
      console.log("u", user.details._id);
      if (res.data.group.createdBy === user.details._id) {
        setIsAdmin(true);
      }
      setUsers(members);
      setTotalUsers(res.data.totalUsers.length);
      setIsLoading(false);
    } else {
      history.push("/404");
    }
  };

  const [showDrawer, setShowDrawer] = useState(false);
  const [showView, setShowView] = useState("chat");

  const toggleDrawer = () => setShowDrawer(!showDrawer);

  const [report, setReport] = useState([]);

  const getReports = async () => {
    const res = await GetReportsService(params.id);
    if (res?.status === 200) {
      const data = res?.data?.reports.map((el) => {
        return {
          ...el,
          name: el.file_name,
        };
      });
      setReport(data);
    }
  };

  const downloadReport = async (name) => {
    const res = await DownloadReportFileService(name);
  };

  useEffect(() => {
    if (showView === "attendance") getReports();
  }, [showView]);

  return (
    <SocketContext.Provider
      value={{
        socket: mainContext.socket,
        user,
        toggleCall,
        callModal,
        toggleCallModal,
        connectionRef,
        userVideo,
        stream,
        caller,
        isAdmin,
        groupId: params.id,
      }}
    >
      <Page title={`${group.name || ""} | Slate`}>
        <Box component="div" className="channel-creation-flex">
          <GroupSideMenu
            fromDrawer={false}
            showModal={showModal}
            users={users}
            group={group}
            creator={creator}
            totalUsers={totalUsers}
            isAdmin={isAdmin}
          />
          <Box component="div" className="channel-chat-main">
            <Box component="div" className="channel-right-nav">
              <Box component="div" className="channel-general-nav">
                <Box className="chat-back-btn">
                  <Backbutton path="slate/groups" />
                </Box>
                <Box paddingLeft={2} display={"flex"} alignItems={"center"}>
                  <IconButton
                    style={{
                      fontSize: "1rem",
                      borderRadius: "15px",
                      padding: "8px 10px",
                      backgroundColor:
                        showView === "chat" ? "rgba(0, 0, 0, 0.04)" : "#edf0f5",
                    }}
                    onClick={() => setShowView("chat")}
                  >
                    <BsChatSquareDots
                      style={{
                        marginRight: "5px",
                        fontSize: "14px",
                      }}
                    />
                    Chat
                  </IconButton>
                </Box>
                <Box paddingLeft={2} display={"flex"} alignItems={"center"}>
                  <IconButton
                    style={{
                      fontSize: "1rem",
                      borderRadius: "15px",
                      padding: "8px 10px",
                      backgroundColor:
                        showView === "file" ? "rgba(0, 0, 0, 0.04)" : "#edf0f5",
                    }}
                    onClick={() => setShowView("file")}
                  >
                    <AiOutlineFileText
                      style={{
                        marginRight: "5px",
                      }}
                    />
                    Files
                  </IconButton>
                </Box>
                <Box paddingLeft={2} display={"flex"} alignItems={"center"}>
                  <IconButton
                    style={{
                      fontSize: "1rem",
                      borderRadius: "15px",
                      padding: "8px 10px",
                      backgroundColor:
                        showView === "attendance"
                          ? "rgba(0, 0, 0, 0.04)"
                          : "#edf0f5",
                    }}
                    onClick={() => setShowView("attendance")}
                  >
                    <HiOutlineDocumentReport
                      style={{
                        marginRight: "5px",
                      }}
                    />
                    Attendance
                  </IconButton>
                </Box>
              </Box>
              {/* <Box component="div" className="c-g-n-mid"></Box> */}
              {usersInCall?.length > 0 ? (
                <Box
                  component="div"
                  className="channel-videochat-nav"
                  onClick={startCall}
                  display="flex"
                >
                  <span className="channel-videochat-icon">
                    <CallIcon />
                  </span>
                  <h3 className="channel-videochat-text">Join Meeting</h3>
                </Box>
              ) : (
                <Box
                  component="div"
                  className="channel-videochat-nav"
                  display={"flex"}
                  justifyContent={"flex-end"}
                >
                  <Box
                    display={"flex"}
                    onClick={() => {
                      !isLoading && startCall();
                    }}
                  >
                    <span className="channel-videochat-icon">
                      <FiVideo />
                    </span>
                    <h3 className="channel-videochat-text">Start a meet</h3>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    marginLeft={"10px"}
                    style={{ color: "#0c8776" }}
                    className="info-drawer"
                    onClick={toggleDrawer}
                    zIndex={2}
                  >
                    <Menu />
                  </Box>
                </Box>
              )}
            </Box>
            <Box component="div" className="chat-wrapper">
              {showView === "chat" && <Chat />}
              {showView === "file" && <FileUploader />}
              {showView === "attendance" && (
                <FilesDisplay
                  files={report}
                  from="attendance"
                  downloadFile={downloadReport}
                />
              )}
            </Box>
          </Box>
          {openCall && (
            <CallInterface show={openCall} toggleCall={toggleCall} />
          )}
        </Box>

        <SwipeableDrawer
          className="custom-drawer"
          anchor={"right"}
          open={showDrawer}
          style={{ width: "50%" }}
          onClose={() => setShowDrawer(false)}
          onOpen={() => setShowDrawer(true)}
        >
          <GroupSideMenu
            fromDrawer={true}
            toggleDrawer={toggleDrawer}
            showModal={showModal}
            group={group}
            users={users}
            creator={creator}
            isLoading={isLoading}
            totalUsers={totalUsers}
          />
        </SwipeableDrawer>
        <InviteUsersModal socket={socket} show={show} handleClose={showModal} />
        {/* <CreateChannelModal show={show} showModal={showModal} /> */}
        {/* </Box> */}
      </Page>
    </SocketContext.Provider>
  );
};

export default NewGroupInterface;
