import React, { useLayoutEffect } from "react";
import "./FrontendMain.scss";
import Sidebar from "./sidebar/Sidebar";
import { RouteWithSubRoutes } from "../../config/routeConfig";
import { Switch, useLocation, useHistory } from "react-router-dom";
import Loader from "../Loader/Loader";
import SidebarMobile from "./sidebar/SidebarMobile";
import CallingModal from "components/elements/CallingModal";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { apiEndpoint } from "../../constant/endpoint";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setNotification } from "../../redux/slice/NotificationSlice";
import Sound from "react-sound";
import notification from "../../assets/rington/notification.mp3";
import Ringtone from "../../assets/rington/got.mp3";
import { GetNotificationsService } from "../../services/NotificationService";
import { getNotification } from "../../redux/slice/NotificationSlice";
import gsap from "gsap";

export const MainSocketContext = React.createContext();

const Frontendmain = ({ routes }) => {
  const params = useParams();
  const user = useSelector((state) => state.user);
  const socket = io.connect(apiEndpoint + "/", {
    query: {
      roomName: window.location.pathname.split("/")[3],
      email: user?.details?.email,
    },
  });
  const [notificationAlert, setNotificationAlert] = React.useState(false);
  const location = useLocation();
  const history = useHistory();
  const [callModal, setCallModal] = React.useState(false);
  const [callInfo, setCallInfo] = React.useState({});
  const dispatch = useDispatch();

  const groups = useSelector((state) => state.groups?.data);

  const toggleModal = () => {
    setCallModal(!callModal);
  };

  const getNotifications = async () => {
    const res = await GetNotificationsService(user?.details?._id);
    if (res?.data?.user_notifications) {
      dispatch(getNotification(res.data.user_notifications));
    }
  };

  socket.on("notification alert", () => {
    setNotificationAlert(true);
    if (window.location.pathname === "/slate/notification") {
      getNotifications();
    }
    dispatch(setNotification());
    setTimeout(() => {
      setNotificationAlert(false);
    }, 2000);
  });

  socket.on("call users", ({ groupId, uid, name }) => {
    const isInGroup = groups?.some((group) => group?.GroupID?._id === groupId);
    if (isInGroup) {
      console.log("user details", user?.details?._id, uid);
      if (user?.details?._id !== uid) {
        setCallModal(true);
        setCallInfo({ groupId, uid, name });
        setTimeout(() => {
          setNotificationAlert(false);
          setCallInfo({});
        }, 30000);
      }
    }
  });

  useLayoutEffect(() => {
    gsap.fromTo(
      ".group-wrapper",
      {
        opacity: 0,
        x: 50,
      },
      {
        opacity: 1,
        x: 0,
      }
    );
  }, [location]);

  return (
    <MainSocketContext.Provider
      value={{
        socket: socket,
      }}
    >
      {/* <NavbarFrontend /> */}
      <div className="frontend-flex">
        <Sidebar />

        <div className="group-wrapper">
          <div className="group-main">
            <React.Suspense fallback={<Loader />}>
              <Switch>
                {routes.map((route, i) => {
                  return <RouteWithSubRoutes key={i} {...route} />;
                })}
              </Switch>
            </React.Suspense>
          </div>
        </div>
        {location.pathname.split("/")[3] &&
        location.pathname.split("/")[2] === "groups" ? (
          ""
        ) : (
          <SidebarMobile />
        )}
      </div>
      {notificationAlert && (
        <Sound url={notification} playStatus={Sound.status.PLAYING} />
      )}
      {callModal && (
        <>
          <Sound url={Ringtone} playStatus={Sound.status.STOP} />

          <CallingModal
            caller={callInfo.name}
            groupId={callInfo.groupId}
            toggleCallModal={toggleModal}
          />
        </>
      )}
    </MainSocketContext.Provider>
  );
};

export default Frontendmain;
