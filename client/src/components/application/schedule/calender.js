import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styled from "styled-components";
import { Button, Box } from "@material-ui/core";
import CreateScheduleModal from "./CreateScheduleModal";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { GetScheduleService } from "../../../services/ScheduleService";
import { useHistory } from "react-router-dom";
import Page from "../../../components/page";

const CalenderWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-shadow: 0px 0px 10px 0px #e3e3e3;
  padding: 20px;
`;

export default function TrainingCalendar() {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const localizer = momentLocalizer(moment);

  const [trainings, setTrainings] = useState([]);

  const events = trainings.map(
    (training) =>
      (training = {
        allDay: "false",
        title: training.activity,
        start: moment(training.date).toDate(),
        end: moment(training.date).add(training.duration, "minutes").toDate(),
        resource: training.customer.firstname,
      })
  );
  console.log("events:", events);
  const addSchedule = (e) => {
    // setGroupName(e.target.value);
  };
  const handleChange = (e) => {
    // setGroupName(e.target.value);
  };

  const history = useHistory();

  const [schedules, setSchedules] = useState([]);

  const getSchedules = async () => {
    const res = await GetScheduleService();
    let allList = [];
    if (res?.data?.schedule) {
      res.data.schedule.map((s) => {
        const data = {
          allDay: false,
          title: s.title,
          start: new Date(s.start),
          end: new Date(s.end),
          id: s._id,
          groudId: s.groupId,
        };
        allList = [...allList, data];
      });
      setSchedules(allList);
    }
  };

  function eventStyleGetter(event, start, end, isSelected) {
    console.log("asd", event, start, end, isSelected);
    var backgroundColor = "#" + event.hexColor;
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: "0px",
      opacity: 0.8,
      color: "#fff",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  }

  useEffect(() => {
    getSchedules();
  }, []);
  return (
    <Page title={"Calendar | Slate"}>
      <CalenderWrapper id="calendar-p">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box component={"div"} display={"flex"} justifyContent={"flex-end"}>
            <Button
              variant="contained"
              style={{
                background: "rgba(0, 170, 239, 1)",
                color: "#fff",
                marginBottom: "20px",
              }}
              onClick={toggleModal}
            >
              Add Schedule
            </Button>
          </Box>
          <Calendar
            localizer={localizer}
            events={schedules || []}
            allDayAccessor="allDay"
            titleAccessor="title"
            resourceAccessor="resource"
            startAccessor="start"
            endAccessor="end"
            defaultView="week"
            views={["month", "week", "day"]}
            style={{ height: "calc(100% - 60px)" }}
            selectable={true}
            onSelectEvent={(event) =>
              history.push(`/slate/groups/${event.groudId}`)
            }
            eventPropGetter={eventStyleGetter}
          />
          <CreateScheduleModal
            show={showModal}
            handleClose={toggleModal}
            addSchedule={addSchedule}
            handleChange={handleChange}
            getSchedules={getSchedules}
          />
        </LocalizationProvider>
      </CalenderWrapper>
    </Page>
  );
}
