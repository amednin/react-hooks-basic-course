import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import RepositoriesList from "./RepositoriesList";
import RepositoryModalDetails from "./RepositoryModalDetails";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "800px",
    margin: "auto",
  },
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
    margin: "auto",
  },
  inline: {
    display: "inline",
  },
  link: {
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#428ccb",
  },
  linkDetails: {
    cursor: "pointer",
    "&:hover": {
      fontSize: "15px",
      fontWeight: "bold",
    },
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h1>Github repositories information</h1>
      <RepositoriesList classes={classes} />
      
    </div>
  );
}

export default App;
