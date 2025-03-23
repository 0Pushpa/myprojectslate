import ReactNotification from "react-notifications-component";

// { store }
import "react-notifications-component/dist/theme.css";
import { useDispatch } from "react-redux";
import "./App.scss";
import "./assets/sass/Slate.scss";
import RouteConfig from "./config/routeConfig";
import { logoutUser } from "./redux/action/Index";
import { useEffect } from "react";
import decode from "jwt-decode";
import { store } from "react-notifications-component";

function App() {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
    localStorage.clear();
    window.href = "/signup";
    store.addNotification({
      title: "Session Expired",
      message: "Your Session has been expired, please relogin",
      type: "danger",
      insert: "bottom",
      container: "bottom-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true,
      },
    });
  };

  useEffect(() => {
    // checking if token expired or not
    const token = localStorage.getItem("user-token");
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
  }, []);

  return (
    <div className="App">
      <ReactNotification />
      {RouteConfig()}
    </div>
  );
}

export default App;
