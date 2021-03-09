import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '800px',
    margin: 'auto',
  },
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
    margin: 'auto',
  },
  inline: {
    display: 'inline',
  },
  link: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#428ccb',
  },
}));

function App() {
  
   const classes = useStyles();
   const [open, setOpen] = React.useState(false);

  return (<div className={classes.container}>
    <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Repository name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here will go all repo information
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    <h1>My github repositories information</h1>
      <List className={classes.root}>
        <ListItem alignItems="flex-start" onClick={() => setOpen(true)}>
          <ListItemAvatar>
            <Avatar alt="Amed Ibañez" src="https://avatars.githubusercontent.com/u/1316310?v=4" />
          </ListItemAvatar>
          <ListItemText
            primary="My repository name"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Created at 1 year Ago
                </Typography>
                {" - visit the repository at "}
                <a className={classes.link} href="https://github.com/amednin/">https://github.com/amednin/</a>
              </React.Fragment>
            }
          />
        </ListItem>
        
        <Divider variant="inset" component="li" />

        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Amed Ibañez" src="https://avatars.githubusercontent.com/u/1316310?v=4" />
          </ListItemAvatar>
          <ListItemText
            primary="My repository name"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Created at 1 year Ago
                </Typography>
                {" - visit the repository at "}
                <a className={classes.link} href="https://github.com/amednin/">https://github.com/amednin/</a>
              </React.Fragment>
            }
          />
        </ListItem>

        <Divider variant="inset" component="li" />

        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Amed Ibañez" src="https://avatars.githubusercontent.com/u/1316310?v=4" />
          </ListItemAvatar>
          <ListItemText
            primary="My repository name"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Created at 1 year Ago
                </Typography>
                {" - visit the repository at "}
                <a className={classes.link} href="https://github.com/amednin/">https://github.com/amednin/</a>
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </div>
  );
}

export default App;
