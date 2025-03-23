import { Box, Grid, IconButton } from "@material-ui/core";
import NameLogo from "components/elements/NameLogo";
import React from "react";
import { FiUserPlus, FiZap } from "react-icons/fi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import { EditGroupService } from "../../../../services/GroupService";
import CreateGroup from "../group-modal/CreateGroupModal";

const GroupCard = ({ index, ad, deleteGroup, getGroups }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [groupName, setGroupName] = React.useState(ad?.GroupID?.name);

  const toggleModal = () => {
    setShowModal(!showModal);
    setAnchorEl(false);
  };
  const handleClick = () => {
    setAnchorEl(!anchorEl);
  };

  const editGroup = async () => {
    let data = {
      id: ad?.GroupID?._id,
      name: groupName,
    };
    const res = await EditGroupService(data);
    if (res?.status === 200) {
      toggleModal();
      getGroups();
    }
  };

  const handleChange = (e) => {
    setGroupName(e.target.value);
  };

  return (
    <Grid
      item
      xs={6}
      sm={4}
      md={3}
      lg={2}
      component="div"
      className=" group__box"
      title={ad.name}
      key={index}
      style={{ paddingBottom: "15px", position: "relative" }}
    >
      {/* <Box
        style={{
          position: "absolute",
          right: "20px",
          zIndex: "999",
        }}
        component="span"
        className="group-interface-dots"
        id="basic-button-2"
        aria-controls="basic-menu-2"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <HiOutlineDotsHorizontal />
          </Box> */}
      {ad?.UserID === ad?.GroupID?.createdBy && (
        <IconButton
          style={{
            position: "absolute",
            right: "20px",
            zIndex: "999",
          }}
          onClick={handleClick}
        >
          <HiOutlineDotsHorizontal />
        </IconButton>
      )}

      {anchorEl && (
        <Box component="div" className="group-interface-dots-menu">
          <ul>
            <li onClick={toggleModal}>
              Edit Group
              <Box component="span">
                <FiZap />
              </Box>
            </li>
            <li onClick={() => deleteGroup(ad.GroupID._id)}>
              Delete Group
              <Box component="span" className="group-interface-add-user">
                <FiUserPlus />
              </Box>
            </li>
          </ul>
        </Box>
      )}
      <Link to={"/slate/groups/" + ad.GroupID._id}>
        <Box component="div" className="group-interface-firstgroup">
          <Box component="div" className="group-interface-imgcontainer">
            <NameLogo group={ad.GroupID.name} />
          </Box>
          <Box component="div" className="group-desc">
            <Box component="div" className="group-interface-text">
              <h3
                className="group-interface-h3"
                style={{
                  textTransform: "capitalize",
                }}
              >
                {" "}
                {ad.GroupID.name}
              </h3>
            </Box>
          </Box>
        </Box>
      </Link>
      <CreateGroup
        isEdit={true}
        show={showModal}
        handleClose={toggleModal}
        service={editGroup}
        groupName={groupName}
        handleChange={handleChange}
      />
    </Grid>
  );
};

export default GroupCard;
