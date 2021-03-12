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

export default class RepositoryModalDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repoDetails: null,
      loading: false,
    }
  }

  async retrieveRepoDetails() {
    const { username, repoName } = this.props;
    const response = await getRepositoryDetails(username, repoName);
    if (!response.ok) {
      return Promise.resolve([]);
    }
    const repoDetailsPromise = await response.json();

    return repoDetailsPromise;
  }

  handleEscEvent = (event) => {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }

    if (event.key === "Escape") {
      console.log("Closing modal with ESC key")
      this.props.onClose();
    }

    event.preventDefault();
  }

  componentDidMount() {
    this.setState({loading: true});
    this.retrieveRepoDetails().then((repoDetails) => {
      console.log(repoDetails);
      this.setState({ repoDetails, loading: false });
    });

    window.addEventListener("keydown", this.handleEscEvent, false);
  }

  componentWillUnmount() {
    console.log('Umounting modal');
    // window.removeEventListener("keydown", this.handleEscEvent, false);
  }

  render() {
    const { open, onClose } = this.props;

    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Repository name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {this.state.loading && <span><b>Loading...</b></span>}
            {this.state.repoDetails && <RepoDetailsInfo {...this.state.repoDetails} />}
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
}
