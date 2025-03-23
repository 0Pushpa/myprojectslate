import React, { useState } from "react";
import {
  FiActivity,
  FiFilePlus,
  FiMessageCircle,
  FiUsers,
} from "react-icons/fi";
import { IoSettingsSharp } from "react-icons/io5";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { store } from "react-notifications-component";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import Navbarimg from "../../../assets/images/portfolio/navimg.jpg";
import { logoutUser } from "../../../redux/action/Index";
import { Box } from "@material-ui/core";
import styled from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
// import logo from "../../../assets/logo/slate.PNG";
const IconWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.2em;
  aspect-ratio: 1;
  font-size: 1.3rem;
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
  max-width: 80%;
  margin: 0 auto;
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

const SidebarMobile = () => {
  const [slide, setSlide] = useState(false);
  const slider = () => {
    setSlide(!slide);
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);

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

  return (
    <>
      <Box
        className={"frontend-sidebar-mobile" + (slide ? " hide-sidebar" : "")}
      >
        <Box
          className="sidebar"
          component="div"
          width="100vw"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
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
                  <NavLink100
                    to="/slate"
                    exact
                    className="NavLink100"
                    activeClassName="active-nav-mobile"
                  >
                    <Tooltip title="Activity">
                      <IconWrapper component="span" className="sidebar-icon1">
                        <FiActivity />
                      </IconWrapper>
                    </Tooltip>
                  </NavLink100>
                </Box>
              </MenuList>
              <MenuList>
                <Box component="div" className="navbar-icons-wrapper">
                  <NavLink100
                    to="/slate/contacts"
                    className="NavLink100"
                    activeClassName="active-nav-mobile"
                  >
                    <Tooltip title="Files">
                      <IconWrapper component="span" className="sidebar-icon1">
                        <FiFilePlus />
                      </IconWrapper>
                    </Tooltip>
                  </NavLink100>
                </Box>
              </MenuList>
              <MenuList>
                <Box component="div" className="navbar-icons-wrapper">
                  <NavLink100
                    to="/slate/groups"
                    activeClassName="active-nav-mobile"
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
                <Tooltip title={user && user.details && user.details.name}>
                  <Box
                    component="div"
                    className="navbar-icons-wrapper"
                    onClick={logout}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                  >
                    <Box component="span" className="navbar-li">
                      <img src={Navbarimg} alt="user" width="100" />
                    </Box>
                  </Box>
                </Tooltip>
              </MenuList>
              {/* <MenuList>
                <Box component="div" className="navbar-icons-wrapper">
                  <NavLink100
                    to="/slate/chat"
                    activeClassName="active-nav"
                    className="NavLink100"
                  >
                    <Tooltip title="Chat">
                      <IconWrapper component="span" className="sidebar-icon1">
                        <FiMessageCircle />
                      </IconWrapper>
                    </Tooltip>
                  </NavLink100>
                </Box>
              </MenuList> */}
            </MenuLists>
          </MenuListsWrapper>
        </Box>
      </Box>
    </>
  );
};

export default SidebarMobile;
