import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Skeleton from "@material-ui/lab/Skeleton";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { SocketContext } from "../GroupInterface";

const Showparticipants = ({ title, users, isLoading }) => {
  const user = useSelector((state) => state.user);
  const context = useContext(SocketContext);
  return (
    <Box>
      <Typography
        variant="body2"
        gutterBottom
        style={{
          paddingLeft: "6px",
          color: "rgb(91, 91, 91)",
          fontWeight: "600",
          textTransform: "uppercase",
          fontSize: "0.82rem",
          paddingTop: "20px",
        }}
      >
        {title} - {users.length}
      </Typography>
      <List dense>
        {isLoading ? (
          <ListItem>
            <ListItemAvatar>
              <Skeleton variant="circle" width={40} height={40} />
            </ListItemAvatar>
            <Skeleton variant="rect" width={"100%"} height={40} />
          </ListItem>
        ) : (
          <>
            {users.map((value, index) => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              return (
                <ListItem key={index} button>
                  {value?.name ? (
                    <>
                      <ListItemAvatar>
                        <Avatar
                          alt={`${value?.name?.split("")[0].toUpperCase()}`}
                          src={`/static/images/avatar/${value + 1}.jpg`}
                        />
                      </ListItemAvatar>

                      <ListItemText
                        style={{ textTransform: "capitalize" }}
                        id={labelId}
                        primary={`${value?.name || `Admin ${index + 1}`} ${
                          value._id === user?.details?._id ? "(You)" : ""
                        }`}
                      />
                      {console.log("is admin", context.isAdmin)}
                      {title !== "Admin" && context.isAdmin && (
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="delete">
                            <MoreVertIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      )}
                    </>
                  ) : (
                    <ListItem>
                      <ListItemAvatar>
                        <Skeleton variant="circle" width={40} height={40} />
                      </ListItemAvatar>
                      <Skeleton variant="rect" width={"100%"} height={40} />
                    </ListItem>
                  )}
                </ListItem>
              );
            })}
          </>
        )}
      </List>
      <Divider style={{ backgroundColor: "rgba(44, 29, 29, 0.2)" }} />
    </Box>
  );
};

export default Showparticipants;
