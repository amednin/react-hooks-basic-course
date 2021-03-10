import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export default class RepositoryModalDetails extends React.Component {
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
            Here will go all repo information
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
