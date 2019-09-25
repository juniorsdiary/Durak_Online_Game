import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  controls: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    bottom: '5%',
    left: '23%',
    padding: '1em',
    '& button': {
      margin: '0.5em',
    },
  },
});

const Controls = ({ takeCards, discardCards, activeTake, activeDiscard, textData }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.controls}>
      <Button variant='contained' color='primary' disabled={!activeTake} onClick={takeCards}>
        {textData[4]}
      </Button>
      <Button variant='contained' color='primary' disabled={!activeDiscard} onClick={discardCards}>
        {textData[5]}
      </Button>
    </Paper>
  );
};

Controls.propTypes = {
  discardCards: PropTypes.func,
  takeCards: PropTypes.func,
  activeTake: PropTypes.bool,
  activeDiscard: PropTypes.bool,
  textData: PropTypes.array,
};

export default Controls;
