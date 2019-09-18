import React from 'react';
import PropTypes from 'prop-types';
import { GameFieldCardPlace } from 'Components';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  gameField: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-200px',
    marginLeft: '-250px',
    width: '475px',
    height: '400px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const GameField = ({ onDrop, onDragOver, gameField }) => {
  const { offenceCards, defenceCards } = gameField;
  const classes = useStyles();
  let renderCards = offenceCards.map((item, i) => (
    <GameFieldCardPlace key={i} offenceCardData={offenceCards[i]} defenceCardData={defenceCards[i]} />
  ));

  return (
    <div className={classes.gameField} onDrop={onDrop} onDragOver={onDragOver}>
      {renderCards}
    </div>
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
