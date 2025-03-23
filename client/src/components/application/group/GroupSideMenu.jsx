import { Box, Typography, IconButton, Button } from "@material-ui/core";
import AddButton from "components/elements/AddButton";
import React from "react";
import Contactimg1 from "../../../assets/team.png";
// import Room from "../../../application/socket/SocketContext";
import Backbutton from "../../elements/BackButton";
import Showparticipants from "./menu-components/ShowParticipants";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Skeleton from "@material-ui/lab/Skeleton";
import { BiLogOut } from "react-icons/bi";
import { ChatService, LeaveGroupService } from "../../../services/GroupService";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { MainSocketContext } from "../Frontendmain";

const GroupSideMenu = ({
  showModal,
  users,
  fromDrawer,
  toggleDrawer,
  group,
  creator,
  isLoading,
  totalUsers,
  isAdmin,
}) => {
  const history = useHistory();
  const params = useParams();
  const user = useSelector((state) => state.user);
  const context = React.useContext(MainSocketContext);

  const leaveGroup = async () => {
    const res = await LeaveGroupService({
      userId: user?.details?._id,
      groupId: params.id,
    });
    if (res?.data?.status === "success") {
      const res = await ChatService({
        FromID: user?.details?._id,
        ToID: params.id,
        userName: user?.details?.name,
        message: `${user?.details?.name} have joined the group`,
        messageType: "notification",
        status: true,
      });
      if (res?.status === 200) {
        context.socket.emit("left alert in chat", {
          message: `${user?.details?.name} have left the group`,
          by: user?.details?.name,
          uid: user?.details?._id,
          groupId: params.id,
          sent_at: new Date().toLocaleString(),
          type: "notification",
        });
        history.push("/slate/groups");
      }
    }
  };
  return (
    <Box component="div" className="channel-creation">
      <Box component="div" className="channel-creation-nav">
        <Box component="div" flex="2">
          {fromDrawer ? (
            <IconButton onClick={toggleDrawer}>
              <ChevronRight />
            </IconButton>
          ) : (
            <Backbutton />
          )}
        </Box>
        <Box display="flex" component="div" flex="2" justifyContent="flex-end">
          {group?.name && fromDrawer ? (
            <IconButton onClick={leaveGroup}>
              <BiLogOut />
            </IconButton>
          ) : (
            group?.name &&
            !isAdmin && (
              <IconButton
                style={{
                  borderRadius: "5px",
                  padding: "8px",
                  paddingRight: "0",
                  float: "right",
                  color: "#de1414",
                  fontSize: "0.82rem",
                }}
                size="sm"
                onClick={leaveGroup}
              >
                <BiLogOut />

                <Box paddingLeft={"4px"}>Leave Group</Box>
              </IconButton>
            )
          )}
        </Box>
      </Box>
      <Box component="div" className="create-channel-group">
        {group?.name ? (
          <img
            alt="cimage"
            src={Contactimg1}
            className="create-channel-group-img"
          />
        ) : (
          <Skeleton variant="rect" width={50} height={50} />
        )}

        <Box style={{ textTransform: "capitalize" }}>
          {group?.name ? (
            <h3>{group.name}</h3>
          ) : (
            <Skeleton
              style={{ margin: "0px 0px 5px 10px" }}
              variant="rect"
              width={220}
              height={24}
            />
          )}
          {group?.name ? (
            <span>
              {totalUsers} {totalUsers < 2 ? "participant" : "participants"}
            </span>
          ) : (
            <Skeleton
              style={{ marginLeft: "10px" }}
              variant="rect"
              width={220}
              height={18}
            />
          )}
        </Box>
      </Box>
      <Box component="div" className="channel-name-display">
        {/* <Divider /> */}
        <Box display="flex" justifyContent="flex-end" paddingTop="10px">
          <Box display="flex" gridGap={8} onClick={showModal}>
            <AddButton />{" "}
            <Box
              marginTop="-2px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{ cursor: "pointer" }}
            >
              <Typography variant="body2">Invite</Typography>
            </Box>
          </Box>
        </Box>
        <Showparticipants
          isLoading={isLoading}
          title="Admin"
          users={[creator]}
        />
        <Showparticipants isLoading={isLoading} title="Members" users={users} />
      </Box>
    </Box>
  );
};

export default GroupSideMenu;
