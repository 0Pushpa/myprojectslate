import { Box } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";
import { BiStats } from "react-icons/bi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { IoNotifications } from "react-icons/io5";
import { store } from "react-notifications-component";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { MdAssignment } from "react-icons/md";

import Navbarimg from "../../../assets/images/portfolio/navimg.jpg";
import logo from "../../../assets/logo/slate.PNG";
import { logoutUser } from "../../../redux/action/Index";
import gsap from "gsap";

const IconWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.2em;
  aspect-ratio: 1;
  font-size: 1.3rem;
  position: relative;
`;

const NavLink100 = styled(NavLink)`
  width: 100%;
  color: #575757;
  padding: 0.5em 0;
`;

const MenuList = styled.li`
  width: 100%;
`;

const MenuLists = styled.ul`
  width: 100%;
`;

const MenuListsWrapper = styled.div`
  width: 100%;

  flex: 1;
`;

const MenuListsWrapperLast = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: flex-end;
`;

const LogoImg = styled.img`
  width: 75px;
  margin-top: 10px;
`;

const UserName = styled.span`
  text-transform: capitalize;
  font-weight: 600;
  color: #575757;
  font-size: 0.9rem;
`;

const CounterEle = styled.span`
  color: #575757;
  width: 1.5em;
  position: absolute;
  left: 26px;
  font-size: 0.8rem;
  height: 1.5em;
  background: #f13b3b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  top: 10px;
  padding-top: 1px;
`;
const Sidebar = () => {
  const [slide, setSlide] = useState(false);
  const slider = () => {
    setSlide(!slide);
  };

  const logoRef = React.useRef();

  React.useEffect(() => {
    gsap.fromTo(
      logoRef.current,
      {
        x: -500,
        opacity: 0,
        transition: "0.6s ease-in-out",
      },
      {
        opacity: 1,
        x: -5,
      }
    );
  }, []);

  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const role = useSelector((state) => state.user.details.role);

  const logout = () => {
    dispatch(logoutUser());
    localStorage.clear();
    store.addNotification({
      title: "Success",
      message: "Logged Out Successfully",
      type: "info",
      insert: "bottom",
      container: "bottom-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true,
      },
    });
    history.push("/");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const notification = useSelector((state) => state.notification);

  return (
    <>
      <Box className={"frontend-sidebar" + (slide ? " hide-sidebar" : "")}>
        <Box
          className="sidebar"
          component="div"
          width="5.5em"
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          bgcolor="background.paper"
        >
          {/* <Box
            component="div"
            className="sidebar-slider-arrow"
            onClick={slider}
          >
            {slide ? <RiArrowRightSLine /> : <RiArrowLeftSLine />}
          </Box> */}
          <MenuListsWrapper>
            <MenuLists>
              <MenuList>
                <Box component="div" className="navbar-icons-wrapper">
                  <NavLink100 to="/slate" exact className="NavLink100">
                    <Tooltip title="Slate">
                      <LogoImg src={logo} alt="logo" />
                    </Tooltip>
                  </NavLink100>
                </Box>
              </MenuList>
            </MenuLists>
          </MenuListsWrapper>
          <MenuListsWrapper>
            <MenuLists>
              {/* <MenuList>
                <Box component="div" className="navbar-icons-wrapper">
                  <NavLink100
                    to="/slate/contacts"
                    className="NavLink100"
                    activeClassName="active-nav"
                  >
                    <Tooltip title="Files">
                      <IconWrapper component="span" className="sidebar-icon1">
                        <FiFilePlus />
                      </IconWrapper>
                    </Tooltip>
                  </NavLink100>
                </Box>
              </MenuList> */}
              <MenuList>
                <Box component="div" className="navbar-icons-wrapper">
                  <NavLink100
                    to="/slate/groups"
                    activeClassName="active-nav"
                    className="NavLink100"
                  >
                    <Tooltip title="Groups">
                      <IconWrapper component="span" className="sidebar-icon1">
                        <FiUsers />
                      </IconWrapper>
                    </Tooltip>
                  </NavLink100>
                </Box>
              </MenuList>
              <MenuList>
                <Box component="div" className="navbar-icons-wrapper">
                  <NavLink100
                    to="/slate/schedule"
                    exact
                    className="NavLink100"
                    activeClassName="active-nav"
                  >
                    <Tooltip title="Calendar">
                      <IconWrapper component="span" className="sidebar-icon1">
                        <FaRegCalendarAlt />
                      </IconWrapper>
                    </Tooltip>
                  </NavLink100>
                </Box>
              </MenuList>

              <MenuList>
                <Box component="div" className="navbar-icons-wrapper">
                  <NavLink100
                    to="/slate/assignment"
                    activeClassName="active-nav"
                    className="NavLink100"
                  >
                    <Tooltip title="Assignment">
                      <IconWrapper component="span" className="sidebar-icon1">
                        <MdAssignment />
                      </IconWrapper>
                    </Tooltip>
                  </NavLink100>
                </Box>
              </MenuList>
              <MenuList>
                <Box component="div" className="navbar-icons-wrapper">
                  <NavLink100
                    to="/slate/statistics"
                    activeClassName="active-nav"
                    className="NavLink100"
                  >
                    <Tooltip title="Statistics">
                      <IconWrapper component="span" className="sidebar-icon1">
                        <BiStats />
                      </IconWrapper>
                    </Tooltip>
                  </NavLink100>
                </Box>
              </MenuList>
              {role !== "admin" && (
                <MenuList>
                  <Box component="div" className="navbar-icons-wrapper">
                    <NavLink100
                      to="/slate/notification"
                      activeClassName="active-nav"
                      className="NavLink100"
                    >
                      <Tooltip title="Notification">
                        <IconWrapper component="span" className="sidebar-icon1">
                          <IoNotifications />
                          {notification.unreadNotifications > 0 && (
                            <CounterEle>
                              {notification.unreadNotifications}
                            </CounterEle>
                          )}
                        </IconWrapper>
                      </Tooltip>
                    </NavLink100>
                  </Box>
                </MenuList>
              )}
            </MenuLists>
          </MenuListsWrapper>
          <MenuListsWrapperLast>
            <MenuLists>
              <MenuList style={{ paddingBottom: "10px" }}>
                <Tooltip title={user && user.details && user.details.name}>
                  <Box
                    component="div"
                    className="navbar-icons-wrapper"
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    style={{ position: "relative" }}
                  >
                    <Box component="span" className="navbar-li">
                      <img src={Navbarimg} alt="user" width="100" />
                    </Box>
                    <Box component="div" className="sidebar-user">
                      <UserName>
                        {user &&
                          user.details &&
                          user.details.name.split(" ")[0]}
                      </UserName>
                    </Box>
                  </Box>
                </Tooltip>

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={(() => handleClose, logout)}>
                    Logout
                  </MenuItem>
                </Menu>
              </MenuList>
            </MenuLists>
          </MenuListsWrapperLast>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
