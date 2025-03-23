import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import TagFacesIcon from "@material-ui/icons/TagFaces";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
    background: "#f1f3f8 !important",
    boxShadow: "unset",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function Pills({ chipData, setChipData }) {
  const classes = useStyles();

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  console.log("da", chipData);

  return (
    <Paper component="ul" className={classes.root}>
      {chipData.map((data, index) => {
        let icon;

        return (
          <li key={index}>
            <Chip
              icon={icon}
              label={data}
              onDelete={data === "React" ? undefined : handleDelete(data)}
              className={classes.chip}
            />
          </li>
        );
      })}
    </Paper>
  );
}
