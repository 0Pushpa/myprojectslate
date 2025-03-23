import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import { Button, Grid } from "@material-ui/core";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { TextField, makeStyles } from "@material-ui/core";
import { Box } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Searchbar from "../../elements/Searchbar";
import { AddScheduleService } from "services/ScheduleService";
import { useSelector } from "react-redux";
import { store } from "react-notifications-component";
import {
  GetMyGroupService,
  GetGroupService,
} from "../../../services/GroupService";

function CreateScheduleModal(props) {
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

  const [title, setTitle] = React.useState("");
  const [groups, setGroups] = React.useState([]);
  const [startDate, setStartDate] = React.useState(() => new Date());
  const [endDate, setEndDate] = React.useState(() => new Date());
  const [groupId, setGroupId] = React.useState("");

  const userId = useSelector((state) => state?.user?.details?._id);

  const saveSchedule = async () => {
    const res = await AddScheduleService({
      title,
      start: startDate,
      end: endDate,
      groupId,
      createdBy: userId,
    });
    if (res.status === 200) {
      props.handleClose();
      props.getSchedules();
      notify("Success", "Schedule Created Successfully", "success");
    } else {
      notify("Error", res.message ? res.message : "Unexpected error", "danger");
    }
  };

  const getMyGroups = async () => {
    const res = await GetMyGroupService({ userId });
    if (res?.data?.group) {
      setGroups(res.data.group);
    }
  };

  const selectGroup = (e, v) => {
    setGroupId(v._id);
  };

  React.useEffect(() => {
    getMyGroups();
  }, []);
  return (
    <>
      <Box component="div">
        <Modal
          show={props.show}
          onHide={props.handleClose}
          className="contact-add-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Create a schedule</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Box component="div" className="name-your-group">
              <Box component="div" className="group-photo-add">
                <Box component="div" className="custom-input" flex="4">
                  <Grid container spacing={2}>
                    <Grid item style={{ width: "100%" }} xs={12}>
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Schedule Title"
                        variant="outlined"
                        type="text"
                        style={{
                          width: "100%",
                        }}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      ></TextField>
                    </Grid>
                    <Grid item style={{ width: "100%" }} xs={12}>
                      <DateTimePicker
                        label="Start Date"
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
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
                    <Grid item style={{ width: "100%" }} xs={12}>
                      <DateTimePicker
                        label="End Date"
                        value={endDate}
                        // onChange={(newValue) => setEndDate(newValue)}
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
                    <Grid item style={{ width: "100%" }} xs={12}>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={groups}
                        sx={{ width: 300 }}
                        getOptionLabel={(option) => option.name}
                        onChange={selectGroup}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Select Group"
                            variant="outlined"
                            {...params}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="contained"
              style={{ background: "rgba(0, 170, 239, 1)", color: "#fff" }}
              onClick={saveSchedule}
            >
              Create Schedule
            </Button>
          </Modal.Footer>
        </Modal>
      </Box>
    </>
  );
}

export default CreateScheduleModal;
