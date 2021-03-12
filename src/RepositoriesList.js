import React from "react";
import { getRepositoryList } from "./api/github";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import * as moment from "moment";
import { CircularProgress, TextField } from "@material-ui/core";
import RepositoryModalDetails from "./RepositoryModalDetails";

export default class RepositoriesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      username: "amednin",
      list: [],
      openModal: false,
      repoNameSelected: '',
    };
    console.log("constructor");
  }

  async retrieveRepos() {
    const { username } = this.state;
    const response = await getRepositoryList(username);
    if (!response.ok) {
      return Promise.resolve([]);
    }
    const reposPromise = await response.json();

    return reposPromise;
  }

  componentDidMount() {
    this.retrieveRepos().then((repos) => {
      this.setState({ list: repos, loading: false });
    });

    console.log("on mounted");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("on state update");
    if (prevState.username !== this.state.username) {
      this.setState({ loading: true });
      this.retrieveRepos().then((repos) => {
        this.setState({ list: repos, loading: false });
      });
    }
  }

  handleDetailsEvent = (repoName) => {
    return e => {
      this.setState({ openModal: true });
      this.setState({ repoNameSelected: repoName });
    }
  }

  render() {
    const { classes } = this.props;
    console.log("on render");

    return (
      <>
        {this.state.openModal && <RepositoryModalDetails
          open={this.state.openModal}
          onClose={() => this.setState({ openModal: false })}
          username={this.state.username}
          repoName={this.state.repoNameSelected}
        />}
        <TextField
          id="outlined-basic"
          label="Enter username"
          variant="outlined"
          value={this.state.username}
          onChange={(e) => this.setState({ username: e.target.value })}
        />
        {this.state.loading && <CircularProgress key={`loader-${this.state.username}`} />}
        {!this.state.loading && (
          <List className={classes.root}>
            {this.state.list.length === 0 && <h3>No repositories found!</h3>}
            {this.state.list.map((i) => (
              <>
                <ListItem alignItems="flex-start" key={i.id}>
                  <ListItemAvatar>
                    <Avatar alt={i.owner.login} src={i.owner.avatar_url} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={i.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          Created at {moment(i.created_at).fromNow()}
                        </Typography>
                        {" - visit the repository at "}
                        <a
                          className={classes.link}
                          href={i.html_url}
                          target="_blank"
                        >
                          {i.html_url}
                        </a>
                        <br />
                        <a className={classes.linkDetails} onClick={this.handleDetailsEvent(i.name)}>
                          See more details
                        </a>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider
                  variant="inset"
                  component="li"
                  key={`divider-${i.id}`}
                />
              </>
            ))}
          </List>
        )}
      </>
    );
  }
}
