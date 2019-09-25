import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => {
  const primary = theme.palette.primary;
  const secondary = theme.palette.secondary;
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '70%',
      alignSelf: props => (props.client ? 'flex-end' : 'flex-start'),
    },
    nickname: {
      fontWeight: 'bold',
    },
    message: {
      padding: theme.spacing(1),
      background: props => (props.client ? primary.light : secondary.light),
      color: props => (props.client ? primary.contrastText : secondary.contrastText),
    },
  };
});

const Message = ({ clientName, nickname, message }) => {
  const classes = useStyles({ client: nickname === clientName });
  return (
    <Grow in={true}>
      <Grid item className={classes.container}>
        <Typography display='inline' className={classes.nickname}>
          {`${nickname}:`}
        </Typography>
        <Paper className={classes.message}>{message}</Paper>
      </Grid>
    </Grow>
  );
};

Message.propTypes = {
  message: PropTypes.string,
  nickname: PropTypes.string,
  clientName: PropTypes.string,
};

export default Message;
