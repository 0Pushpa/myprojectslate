// import { ImageUpload } from "../../../../elements/ImageUpload";
import { Box, TextField, Grid } from "@material-ui/core";
import Searchbar from "components/elements/Searchbar";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DateTimePicker from "@mui/lab/DateTimePicker";

import { GetGroupService } from "services/GroupService";
import { useSelector } from "react-redux";
import { FaDailymotion } from "react-icons/fa";
import { store } from "react-notifications-component";
import { PostAssignmentService } from "../../../services/AssignmentService";
import { GetMyGroupService } from "../../../services/GroupService";

function AssignmentModal(props) {
  const notify = (title, message, type) => {
    store.addNotification({
      title,
      message,
      type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 4000,
        onScreen: true,
      },
    });
  };
  const [deadline, setDeadline] = React.useState(() => new Date());
  const [groupId, setGroupId] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [file, setFile] = React.useState("");
  const userId = useSelector((state) => state?.user?.details?._id);
  const [groups, setGroups] = React.useState([]);
  const [description, setDescription] = React.useState("");

  const getMyGroups = async () => {
    const res = await GetMyGroupService({ userId });
    if (res?.data?.group) {
      setGroups(res.data.group);
    }
  };

  React.useEffect(() => {
    getMyGroups();
  }, []);

  const selectGroup = (e, v) => {
    setGroupId(v._id);
  };

  const fileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const creteAssignment = async () => {
    const res = await PostAssignmentService({
      title,
      deadline,
      description,
      groupId,
      userId,
    });
    if (res.status === 200) {
      props.handleClose();
      props.getAssignment();
      notify("Success", "Assignment Created Successfully", "success");
    } else {
      notify("Error", res.message ? res.message : "Unexpected error", "danger");
    }
  };
  return (
    <>
      <Box component="div">
        <Modal
          show={props.show}
          onHide={props.handleClose}
          className="contact-add-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Upload your files</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Box component="div" className="name-your-group">
              <Box component="div" className="group-photo-add">
                <Box padding="20px 5px">
                  <TextField
                    id="outlined-basic"
                    label="Enter your title"
                    variant="outlined"
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </Box>
                <Box padding="20px 5px">
                  <TextField
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    type="text"
                    multiline
                    minRows={4}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </Box>
                <Grid
                  style={{
                    position: "relative",
                  }}
                >
                  <DateTimePicker
                    label="Deadline Date"
                    value={deadline}
                    onChange={(newValue) => setDeadline(newValue)}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Schedule Title"
                        variant="outlined"
                        {...params}
                      />
                    )}
                  />
                </Grid>

                {/* <Box component="div" padding="5px" marginTop="15px">
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      type="file"
                      accept=".pdf,.docx,.txt,.doc,.xlsx,.xls,.csv,.ppt,.pptx,.pptm"
                      style={{
                        width: "100%",
                      }}
                      onChange={fileChange}
                    ></TextField>
                  </Box> */}
              </Box>
            </Box>
            <Box component="div" className="custom-input" padding="20px 5px">
              <Autocomplete
                id="combo-box-demo"
                options={groups}
                getOptionLabel={(option) => option.name}
                style={{ width: "100%" }}
                onChange={selectGroup}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    label="Select Groups"
                    variant="outlined"
                  />
                )}
              />
            </Box>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={creteAssignment}>
              Submit Assignment
            </Button>
          </Modal.Footer>
        </Modal>
      </Box>
    </>
  );
}

export default AssignmentModal;
