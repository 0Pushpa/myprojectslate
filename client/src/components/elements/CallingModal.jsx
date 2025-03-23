import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { HiPhoneMissedCall } from "react-icons/hi";
import { MdCall } from "react-icons/md";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sound from "react-sound";
import Ringtone from "../../assets/rington/got.mp3";
import NameLogo from "./NameLogo";
// import context from "react-bootstrap/esm/AccordionContext";
// import Peer from "simple-peer";
// import { SocketContext } from "../application/group-backup/group-main-contents/NewGroupInterface";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 210,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function CallingModal({
  toggleCallModal,
  callModal,
  caller,
  callAccepted,
  groupId,
}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const [groupDetails, setGroupDetails] = React.useState({});

  const groups = useSelector((state) => state.groups?.data);

  useEffect(() => {
    if (groups) {
      const group = groups?.find((group) => group?.GroupID?._id !== groupId);
      setGroupDetails(group);
    }
  }, [groups]);

  const dispatch = useDispatch();
  const history = useHistory();

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className="call-modal-wrapper">
        <div className="caller-img">
          {/* <img src="" alt="" />
           */}
          <NameLogo group={groupDetails?.GroupID?.name || "Group"} />
        </div>
        <div className="caller-desc">
          <p>Incoming call from {caller && caller}</p>
        </div>
        <div className="call-actions">
          <ul>
            <li>
              <div
                className="call-button red"
                onClick={() => {
                  toggleCallModal();
                }}
              >
                <HiPhoneMissedCall />
              </div>
            </li>
            <li>
              <div
                onClick={() => {
                  toggleCallModal();
                  history.push(`/slate/groups/${groupId}?call=true`);
                }}
                className="call-button green"
              >
                <MdCall />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={true}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
