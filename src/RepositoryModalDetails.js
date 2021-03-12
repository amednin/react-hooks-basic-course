import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { getRepositoryDetails } from "./api/github";
import RepoDetailsInfo from "./RepoDetailsInfo";

export default function RepositoryModalDetails({ username,repoName, open, onClose }) {
  const [repoDetails, setRepoDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    retrieveRepoDetails().then((repoDetails) => {
      setRepoDetails(repoDetails);
      setLoading(false);
    });
  }, [repoName, username]);

  React.useEffect(() => {
    window.addEventListener("keydown", handleEscEvent, false);

    return () => {
      console.log('Unmounting Modal Details');
      window.removeEventListener("keydown", handleEscEvent, false);
    }
  });

  async function retrieveRepoDetails() {
    const response = await getRepositoryDetails(username, repoName);
    if (!response.ok) {
      return Promise.resolve([]);
    }
    const repoDetailsPromise = await response.json();

    return repoDetailsPromise;
  }

  const handleEscEvent = (event) => {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }

    if (event.key === "Escape") {
      console.log("Closing modal with ESC key")
      onClose();
    }

    event.preventDefault();
  }


  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title">Repository name</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {loading && <span><b>Loading...</b></span>}
          {repoDetails && <RepoDetailsInfo {...repoDetails} />}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
