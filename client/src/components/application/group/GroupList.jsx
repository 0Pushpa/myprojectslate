import { Box, Grid } from "@material-ui/core";
import NotFound from "components/not-found/not-found";
import React, { createContext, useEffect, useState } from "react";
import { HiUserGroup } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  AddGroupService,
  GetMyAccessedGroupService,
} from "services/GroupService";
import Searchbar from "../../elements/Searchbar";
import Page from "../../page";
import GroupCard from "./components/GroupCard";
import CreateGroup from "./group-modal/CreateGroupModal";
import { DeleteGroupService } from "../../../services/GroupService";
import { store } from "react-notifications-component";
import { MainSocketContext } from "../Frontendmain";

export const GroupContext = createContext({});

const GroupList = () => {
  const [showModal, setShowModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [displayGroup, setDisplayGroup] = useState(true);
  const [open, setOpen] = useState([]);
  const dispatch = useDispatch();
  const groupList = useSelector((state) => state?.groups?.data);
  const user = useSelector((state) => state?.user?.details?._id);
  useEffect(() => {
    setGroups(groupList);
  }, [groupList]);

  const getGroups = async () => {
    const res = await GetMyAccessedGroupService({ userId: user });
    console.log("groups", res);
    if (res) {
      dispatch({
        type: "GET_GROUPS",
        payload: res?.data?.groups,
      });
    }
  };

  const { socket } = React.useContext(MainSocketContext);

  useEffect(() => {
    getGroups();
  }, []);

  socket.on("group was deleted", (payload) => {
    getGroups();
  });

  const deleteGroup = async (id) => {
    const res = await DeleteGroupService(id);
    if (res?.status === 200) {
      store.addNotification({
        title: "Group deletion",
        message: "Group deleted successfully",
        type: "success",
        insert: "bottom",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
      getGroups();
      socket.emit("group deleted", {
        groupId: id,
      });
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const addGroup = async () => {
    let data = {
      name: groupName,
      createdBy: user,
    };
    const res = await AddGroupService(data);
    if (res?.data.group) {
      // setGroups([...groups, data]);
      setOpen([...open, false]); //yeuta group lai yeuta false assign garna milxa
      toggleModal();
      getGroups();
    }
  };
  const handleChange = (e) => {
    setGroupName(e.target.value);
  };

  const filterGroup = (e, search) => {
    if (groupList) {
      const filtered = groupList.filter((item) => {
        return item?.GroupID?.name
          ?.toLowerCase()
          .includes(search?.toLowerCase());
      });
      setGroups(filtered);
    }
  };

  return (
    <>
      <GroupContext.Provider
        value={{
          showModal,
          groups,
          groupname: groupName,
          toggleModal,
          handleChange,
          addGroup,
        }}
      >
        {/* <Box component="div" className="group-wrapper"> */}
        {/* <Box component="div" className="group-main"> */}
        <Page title="Groups | Slate">
          <Box padding={`10px 25px`}>
            <Box component="div" className="group-nav" marginBottom={"2px"}>
              <Box component="div" className="group-nav1">
                <Box component="span" className="group-nav-title"></Box>
              </Box>
              <Box component="div" className="group-nav2">
                <Searchbar onSearch={filterGroup} />
              </Box>
              <Box component="div" className="group-nav3">
                <Box
                  component="div"
                  className="group-nav-addall"
                  onClick={toggleModal}
                >
                  <Box component="span" className="group-nav-add">
                    <HiUserGroup />
                  </Box>
                  <h3 className="group-nav-add-h3">Create group</h3>
                </Box>
              </Box>
            </Box>

            <Grid className="group-interface-cover row">
              {groups?.length < 1 && (
                <Box textAlign="center" paddingTop={"20px"} color={"#575757"}>
                  <NotFound item="groups" />
                </Box>
              )}
              {groups &&
                groups?.map((ad, index) => {
                  return (
                    <GroupCard
                      index={index}
                      ad={ad}
                      deleteGroup={deleteGroup}
                      getGroups={getGroups}
                    />
                  );
                })}
            </Grid>
            {/* </Box> */}

            <CreateGroup
              isEdit={false}
              show={showModal}
              handleClose={toggleModal}
              service={addGroup}
              groupName={groupName}
              handleChange={handleChange}
            />
          </Box>
        </Page>
      </GroupContext.Provider>
    </>
  );
};

export default GroupList;
