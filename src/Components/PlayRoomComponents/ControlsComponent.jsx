import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Container, Button } from '@material-ui/core';

const useStyles = makeStyles({
  controls: {
    position: 'absolute',
    bottom: '10px',
    left: '18%',
  },
});

const ControlsComponent = ({ takeCards, discardCards, activeTake, activeDiscard }) => {
  const classes = useStyles();
  return (
    <div className={classes.controls}>
      <Button variant='contained' color='primary' disabled={!activeTake} onClick={takeCards}>
        Take
      </Button>
      <Button variant='contained' color='primary' disabled={!activeDiscard} onClick={discardCards}>
        Discard
      </Button>
    </div>
  );
};

ControlsComponent.propTypes = {
  discardCards: PropTypes.func,
  takeCards: PropTypes.func,
  activeTake: PropTypes.bool,
  activeDiscard: PropTypes.bool,
};

export default ControlsComponent;
