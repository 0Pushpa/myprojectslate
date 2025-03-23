import React, { useState, createContext } from "react";
import { HiUserGroup } from "react-icons/hi";
import { BiCaretRight, BiCaretDown } from "react-icons/bi";
import GroupModal from "../group/GroupModal";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FiZap, FiUserPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Contactimg1 from "../../../assets/images/portfolio/conatctimg1.jpg";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export const GroupContext = createContext();

const GroupInterface = () => {
  const [show, setShow] = useState(false);
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [displayGroup, setDisplayGroup] = useState(true);
  const [arrowChange, setArrowChange] = useState(true);
  const [open, setOpen] = useState([]);
  const dispatch = useDispatch();
  const grp = useSelector((state) => state.groups.store);
  useEffect(() => {
    setGroups(grp);
  }, [grp]);

  const handleClose = () => {
    setShow(!show);
  };
  const handleShow = () => {
    setShow(!show);
  };

  const addGroup = () => {
    let data = {
      id: groups.length + 1,
      name: groupName,
    };
    // setGroups([...groups, data]);
    setArrowChange(true);
    setOpen([...open, false]); //yeuta group lai yeuta false assign garna milxa
    handleClose();

    dispatch({
      type: "GROUP_STORE",
      payload: data,
    });
  };
  const handleChange = (e) => {
    setGroupName(e.target.value);
  };

  const showGroup = () => {
    setDisplayGroup(!displayGroup);
    setArrowChange(!arrowChange);
  };
  const openDots = (index) => {
    let data = open.map((o, i) => {
      //o=value k ayo i=index of open
      if (index === i) {
        return !o;
      } else {
        return o;
      }
    });
    setOpen(data);
  };

  return (
    <>
      <GroupContext.Provider
        value={{
          show,
          groups,
          groupname: groupName,
          handleClose,
          handleShow,
          handleChange,
          addGroup,
        }}
      >
        {/* <div className="group-wrapper"> */}
        {/* <div className="group-main"> */}
        <div className="group-nav">
          <div class="group-nav1">
            <span className="group-nav-title">
              <h3 className="group-nav-h3">Groups</h3>
              {arrowChange ? (
                <BiCaretDown onClick={showGroup} />
              ) : (
                <BiCaretRight onClick={showGroup} />
              )}
            </span>
          </div>
          <div className="group-nav2"></div>
          <div className="group-nav3">
            <div className="group-nav-addall" onClick={handleShow}>
              <span className="group-nav-add">
                <HiUserGroup />
              </span>
              <h3 className="group-nav-add-h3">Create group</h3>
            </div>
          </div>
        </div>

        <div className="group-interface-cover row">
          {groups.map((ad, index) => {
            return (
              <>
                {arrowChange ? (
                  <div
                    className="col-sm-4 col-md-3 col-lg-2 group__box"
                    title={ad}
                    key={index}
                  >
                    <Link to={"/slate/groups/" + ad.id}>
                      <div className="group-interface-firstgroup">
                        <span className="group-interface-dots">
                          <HiOutlineDotsHorizontal
                            onClick={() => openDots(index)}
                          />
                        </span>
                        {open[index] ? (
                          <div className="group-interface-dots-menu">
                            <ul>
                              <li>
                                Manage Group
                                <span>
                                  <FiZap />
                                </span>
                              </li>
                              <li>
                                Add Members
                                <span className="group-interface-add-user">
                                  <FiUserPlus />
                                </span>
                              </li>
                            </ul>
                          </div>
                        ) : (
                          ""
                        )}

                        <span className="group-interface-imgcontainer">
                          <img
                            alt="group"
                            src={Contactimg1}
                            className="group-interface-img"
                          />
                        </span>
                        <div className="group-desc">
                          <div className="group-interface-text">
                            <h3 className="group-interface-h3"> {ad.name}</h3>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ) : (
                  ""
                )}
              </>
            );
          })}
        </div>
        {/* </div> */}

        <GroupModal />
        {/* </div> */}
      </GroupContext.Provider>
    </>
  );
};

export default GroupInterface;
