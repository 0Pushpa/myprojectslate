import React from "react";

import Mainpage from "./components/homepage/Mainpage";
import Login_Signup from "./components/login_signup/Login_Signup";
import Frontendmain from "./components/application/Frontendmain";
import { IsLoggedIn } from "./guard/RouteGuaard";
import Page404 from "./components/application/Page404";
import InitialPopUp from "./components/login_signup/login_signup_v2/InitialPopUp";
import EmailVerified from "./components/auth/EmailVerified";
import ResetPassword from "./components/auth/ResetPassword";
import ForgotPassword from "./components/auth/ForgotPassword";
import Login_Registration from "./components/login_signup/v2/Login_Register";

import GroupList from "./components/application/group/GroupList";
import MyCalendar from "./components/application/schedule/calender";
import NotificationData from "./components/application/notification/NotificationData";
import Redirect from "components/Redirect";
import Attendance from "components/application/assignment/Assignment";
import Assignment from "components/application/assignment/Assignment";
import SubmitAssignment from "components/application/assignment/SubmitAssignment";

const Contact = React.lazy(() =>
  import("./components/application/contact/Contact")
);
// const GroupList = React.lazy(() =>
//   import("./components/application/group/GroupList")
// );
const GroupInterface = React.lazy(() =>
  import("./components/application/group/GroupInterface")
);
// const MyCalendar = React.lazy(() =>
//   import("./components/application/schedule/calender")
// );

// const NotificationData = React.lazy(() =>
//   import("./components/application/notification/NotificationData")
// );
const CompressionStatusData = React.lazy(() =>
  import("./components/application/statistics/CompressionStatusData")
);

// const GroupInterface = React.lazy(() =>
//   import("./components/application/group/GroupInterface")
// );
// const NewGroupInterface = React.lazy(() =>
//   import("./components/application/group/group-main-contents/NewGroupInterface")
// );

export const Routes = () => {
  const isAuthenticated = IsLoggedIn();

  return [
    {
      path: "/",
      component: Mainpage,
      exact: true,
    },
    {
      path: "/signup",
      // component: Login_Signup,
      component: Login_Registration,
      isLoggedIn: isAuthenticated === "permit" ? "deny" : "permit",
      exact: true,
    },
    {
      path: "/confirmation/:email/:token",
      // component: Login_Signup,
      component: EmailVerified,
    },
    {
      path: "/reset/:email/:token",
      // component: Login_Signup,
      component: ResetPassword,
    },
    {
      path: "/forgot-password",
      // component: Login_Signup,
      component: ForgotPassword,
    },
    {
      path: "/slate",
      component: Frontendmain,
      isLoggedIn: isAuthenticated,
      routes: [
        {
          path: "/slate/",
          component: Redirect,
          exact: true,
        },
        {
          path: "/slate/contacts",
          component: Contact,
          exact: true,
        },
        {
          path: "/slate/schedule",
          component: MyCalendar,
          exact: true,
        },
        {
          path: "/slate/groups",
          component: GroupList,
          exact: true,
        },
        {
          path: "/slate/groups/:id",
          component: GroupInterface,
        },
        {
          path: "/slate/notification",
          component: NotificationData,
          exact: true,
        },
        {
          path: "/slate/statistics",
          component: CompressionStatusData,
          exact: true,
        },
        {
          path: "/slate/chat/:id",
          component: GroupInterface,
        },
        {
          path: "/slate/assignment",
          component: Assignment,
          exact: true,
        },
        {
          path: "/slate/assignment/:id",
          component: SubmitAssignment,
        },
      ],
    },
    {
      path: "*",
      component: Page404,
    },
  ];
};
