import React from 'react';
import PropTypes from 'prop-types';
import { GameFieldCardPlace } from 'Components';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  gameField: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '425px',
    height: '305px',
  },
});

const GameField = ({ onDrop, onDragOver, gameField }) => {
  const { offenceCards, defenceCards } = gameField;
  const classes = useStyles();
  let renderCards = offenceCards.map((cardData, i) => (
    <GameFieldCardPlace key={i} offenceCardData={cardData} defenceCardData={defenceCards[i]} placeIndex={i} />
  ));
  const placeIndex = offenceCards.filter(item => item).length;
  return (
    <Grid
      container
      justify='space-evenly'
      alignItems='center'
      className={classes.gameField}
      onDrop={() => onDrop(placeIndex)}
      onDragOver={onDragOver}>
      {renderCards}
    </Grid>
  );
};

GameField.propTypes = {
  gameField: PropTypes.object,
  onDrop: PropTypes.func,
  onDragOver: PropTypes.func,
};

GameField.defaultProps = {
  gameField: {},
};

export default GameField;
