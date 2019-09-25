import React from 'react';
import PropTypes from 'prop-types';
import { GameFieldCardPlace } from 'Components';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useDrop } from 'react-dnd';

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

const GameField = ({ onDrop, gameField }) => {
  const [, drop] = useDrop({
    accept: 'card',
    drop: () => onDrop(placeIndex),
  });

  const { offenceCards, defenceCards } = gameField;

  const classes = useStyles();

  let renderCards = offenceCards.map((cardData, i) => (
    <GameFieldCardPlace key={i} offenceCardData={cardData} defenceCardData={defenceCards[i]} placeIndex={i} />
  ));

  const placeIndex = offenceCards.filter(item => item).length;

  return (
    <Grid container justify='space-evenly' alignItems='center' className={classes.gameField} ref={drop}>
      {renderCards}
    </Grid>
  );
};

GameField.propTypes = {
  gameField: PropTypes.object,
  onDrop: PropTypes.func,
};

GameField.defaultProps = {
  gameField: {},
};

export default GameField;
