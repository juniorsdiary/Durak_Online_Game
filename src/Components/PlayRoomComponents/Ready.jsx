import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle, Grid } from '@material-ui/core';
import { ShowUserReadyState, LeaveRoom } from 'Components';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: theme.spacing(3),
  },
}));

const Ready = ({ users, activeUsers, isFull, isReady, setReadyState, textData }) => {
  const readyUsersState = users.map((item, i) => <ShowUserReadyState key={i} {...item} />);
  const classes = useStyles();
  return (
    <Dialog open={!activeUsers}>
      <DialogTitle>{textData[6]}</DialogTitle>
      <Grid container justify='space-around' alignItems='center' className={classes.wrapper}>
        {readyUsersState}
      </Grid>
      <Grid container justify='space-around' className={classes.wrapper}>
        <Button variant='contained' color='primary' disabled={!isFull || isReady} onClick={setReadyState}>
          {textData[7]}
        </Button>
        <LeaveRoom />
      </Grid>
    </Dialog>
  );
};

Ready.propTypes = {
  isReady: PropTypes.bool,
  setReadyState: PropTypes.func,
  users: PropTypes.array,
  isUsersReady: PropTypes.bool,
  activeUsers: PropTypes.bool,
  isFull: PropTypes.bool,
  textData: PropTypes.array,
};
Ready.defaultProps = {
  activeUsers: false,
  users: [],
};

export default Ready;
