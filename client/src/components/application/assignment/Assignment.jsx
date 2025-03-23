import React, { useState, createContext } from "react";
import { HiUserGroup } from "react-icons/hi";
import { BiCaretRight, BiCaretDown } from "react-icons/bi";
// import AssignmentModal from "./group-modal/CreateGroupMo";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FiZap, FiUserPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
// import Contactimg1 from "../../../assets/images/portfolio/conatctimg1.jpg";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Box, Grid } from "@material-ui/core";
import Searchbar from "../../elements/Searchbar";
import { MdAssignment } from "react-icons/md";
import { GetAssignmentService } from "services/AssignmentService";
import {
  GetMyAccessedGroupService,
  AddGroupService,
} from "services/GroupService";
import NameLogo from "../../elements/NameLogo";
import Page from "../../page";
import NotFound from "components/not-found/not-found";
import AssignmentModal from "./CreateAssignment";
import moment from "moment";
import DateFormatter from "../../../utils/DateFormatter";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
export const GroupContext = createContext({});

const Assignment = () => {
  const [showModal, setShowModal] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const groupList = useSelector((state) => state?.groups?.data);
  const user = useSelector((state) => state?.user?.details?._id);

  const getAssignment = async () => {
    const res = await GetAssignmentService({ userId: user });
    if (res?.status === 200) {
      setAssignments(res?.data?.assignments);
    }
  };

  useEffect(() => {
    getAssignment();
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const filterGroup = (e, search) => {
    e.preventDefault();
    if (assignments) {
      const filtered = assignments.filter((item) => {
        console.log(item.name.toLowerCase(), search.toLowerCase(), "f");
        return item.name.toLowerCase().includes(search.toLowerCase());
      });
      console.log(filtered);
      setAssignments(filtered);
    }
  };

  return (
    <>
      {/* <Box component="div" className="group-wrapper"> */}
      {/* <Box component="div" className="group-main"> */}
      <Page title="Groups | Slate">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box padding={`10px 25px`}>
            <Box component="div" className="group-nav" marginBottom={"2px"}>
              <Box component="div" className="group-nav1">
                <Box component="span" className="group-nav-title"></Box>
              </Box>
              <Box component="div" className="group-nav2">
                {/* <Searchbar onSearch={filterGroup} /> */}
              </Box>
              <Box component="div" className="group-nav3">
                <Box
                  component="div"
                  className="group-nav-addall"
                  onClick={toggleModal}
                >
                  <Box component="span" className="group-nav-add">
                    <MdAssignment />
                  </Box>
                  <h3 className="group-nav-add-h3">Upload Assignment</h3>
                </Box>
              </Box>
            </Box>

            <Grid className="group-interface-cover row">
              {assignments?.length < 1 && (
                <Box textAlign="center" paddingTop={"20px"} color={"#575757"}>
                  <NotFound item="assignments" />
                </Box>
              )}
              {assignments &&
                assignments?.map((ad, index) => {
                  return (
                    <>
                      <Grid
                        xs={6}
                        sm={6}
                        md={4}
                        lg={3}
                        component="div"
                        className=" group__box"
                        title={ad.title}
                        key={index}
                        style={{ paddingBottom: "15px" }}
                      >
                        <Link to={"/slate/assignment/" + ad._id}>
                          <Box
                            component="div"
                            display="flex"
                            flexDirection="row"
                            height="80px"
                            className="group-interface-firstgroup"
                          >
                            <Box
                              flex="1"
                              style={{
                                background: "#575757",
                                color: "#fff",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontWeight: "600",
                                fontSize: "2rem",
                              }}
                            >
                              {ad.title.split("")[0].toUpperCase()}
                            </Box>
                            <Box
                              flex="4"
                              style={{
                                color: "#575757",
                                padding: "5px 10px",
                              }}
                            >
                              <p>{ad.title}</p>
                              <Box
                                style={{
                                  fontSize: "0.85rem",
                                  color: "grey",
                                }}
                              >
                                <div>Group: {ad?.groupId?.name}</div>
                                <div>
                                  Deadline: {DateFormatter(ad.deadline)}
                                </div>
                              </Box>
                            </Box>
                          </Box>
                        </Link>
                      </Grid>
                    </>
                  );
                })}
            </Grid>
            {/* </Box> */}

            <AssignmentModal
              show={showModal}
              handleClose={toggleModal}
              getAssignment={getAssignment}
            />
          </Box>
        </LocalizationProvider>
      </Page>
    </>
  );
};

export default Assignment;
