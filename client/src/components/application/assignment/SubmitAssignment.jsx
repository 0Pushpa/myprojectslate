import React from "react";
import {
  GetAssignmentDetailsService,
  DownloadAssignmentFileService,
} from "services/AssignmentService";
import { Box, Grid, Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import Backbutton from "../../elements/BackButton";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import FilesDisplay from "../group/file-uploader/FilesDisplay";
import { PostUserAssignmentService } from "../../../services/AssignmentService";
import { useSelector } from "react-redux";
import { store } from "react-notifications-component";

const SubmitAssignment = () => {
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

  const [detail, setDetails] = React.useState({});
  const [files, setFiles] = React.useState({});
  const params = useParams();
  const userId = useSelector((state) => state?.user?.details?._id);

  const getDetails = async () => {
    const res = await GetAssignmentDetailsService(params.id);
    if (res?.status === 200) {
      setDetails(res?.data?.assignment);
      setFiles(res?.data?.assignmentSubmit);
    }
  };
  React.useEffect(() => {
    getDetails();
  }, []);

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const downloadFile = async (name) => {
    const res = await DownloadAssignmentFileService(name);
  };

  const fileUpload = async (e) => {
    const fd = new FormData();
    fd.append("assignmentId", params.id);
    fd.append("userId", userId);
    fd.append("file", e.target.files[0]);
    const res = await PostUserAssignmentService(fd);

    if (res?.status === 200) {
      getDetails();
      notify("Success", "Assignment Submitted Successfully", "success");
    } else {
      notify("Error", res.message ? res.message : "Unexpected error", "danger");
    }
  };

  const fileRef = React.useRef();
  return (
    <Box>
      <Grid
        container
        style={{
          padding: "10px",
        }}
      >
        <Grid xs={6} sm={6} md={4}>
          <Backbutton path="slate/assignment" />
        </Grid>
        <Grid xs={6} sm={6} md={4}>
          <Box
            textAlign={"center"}
            fontSize="1.1rem"
            fontWeight={"600"}
            color="#575757"
            textTransform="Capitalize"
          >
            {detail.title}
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={4} display="flex">
          {detail.createdBy && detail.createdBy !== userId && (
            <Button
              variant="contained"
              style={{
                background: "rgba(0, 170, 239, 1)",
                color: "#fff",
                marginBottom: "20px",
                float: "right",
              }}
              onClick={() => fileRef.current.click()}
            >
              Submit Assignment
            </Button>
          )}
        </Grid>
      </Grid>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Submissions" value="1" />
          <Tab label="Description" value="2" />
        </TabList>
        <TabPanel value="1">
          <FilesDisplay
            from="assignment"
            files={files}
            detail={detail}
            downloadFile={downloadFile}
          />
        </TabPanel>
        <TabPanel value="2">
          <Box>{detail.description}</Box>
        </TabPanel>
      </TabContext>
      <input
        type="file"
        style={{
          display: "none",
        }}
        accept=".pdf,.docx,.txt,.doc"
        ref={fileRef}
        onChange={fileUpload}
      />
    </Box>
  );
};

export default SubmitAssignment;
