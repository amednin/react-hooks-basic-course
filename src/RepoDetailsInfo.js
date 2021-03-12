import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function RepoDetailsInfo(props) {
    const classes = useStyles();

    const {
        owner: { avatar_url, login },
        name,
        description,
        language,
        forks,
    } = props;
  
    return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={avatar_url}
            title={login}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <p>{description}</p>
              <p><b>Language: </b>{language}</p>
              <p><b>Private: </b>{props.private ? 'Yes' : 'No'}</p>
              <p><b>Forks: </b>{forks}</p>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Clone
          </Button>
          <Button size="small" color="primary">
            Fork
          </Button>
        </CardActions>
      </Card>
    );
  }
