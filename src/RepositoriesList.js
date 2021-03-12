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

const RepositoriesList = ({ classes }) => {
  const [loading, setLoading] = React.useState(true);
  const [username, setUsername] = React.useState('amednin');
  const [list, setList] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [repoNameSelected, setRepoNameSelected] = React.useState('');

  React.useEffect(() => {
    retrieveRepos().then((repos) => {
      setList(repos);
      setLoading(false);
    });
  }, [username]);

  async function retrieveRepos() {
    const response = await getRepositoryList(username);
    if (!response.ok) {
      return Promise.resolve([]);
    }
    const reposPromise = await response.json();

    return reposPromise;
  }

  const handleDetailsEvent = (repoName) => {
    return e => {
      setOpenModal(true);
      setRepoNameSelected(repoName);
    }
  }

  return (
    <>
      {openModal && <RepositoryModalDetails
        open={openModal}
        onClose={() => setOpenModal(false)}
        username={username}
        repoName={repoNameSelected}
      />}
      <TextField
        id="outlined-basic"
        label="Enter username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {loading && <CircularProgress key={`loader-${username}`} />}
      {!loading && (
        <List className={classes.root}>
          {list.length === 0 && <h3>No repositories found!</h3>}
          {list.map((i) => (
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
                      <a className={classes.linkDetails} onClick={handleDetailsEvent(i.name)}>
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

export default RepositoriesList;
