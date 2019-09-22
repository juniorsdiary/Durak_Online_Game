import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import cardDeck from '../../images/free-vector-card-deck.jpg';
import cardBack from '../../images/back.jpg';
import { Fade } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  parent: {
    left: props => `${props.distance}px`,
    position: 'absolute',
    width: '100px',
    height: '141px',
    perspective: '1000px',
    zIndex: props => (props.beaten ? 1 : 0),
  },
  card: {
    position: 'relative',
    transformStyle: 'preserve-3d',
    width: 'inherit',
    height: 'inherit',
    transform: props => props.rotated && `rotateX(180deg)`,
  },
  face: {
    position: 'absolute',
    width: 'inherit',
    height: 'inherit',
    borderRadius: '6px',
    background: `url(${cardDeck}) no-repeat`,
    backgroundPosition: props => props.backgroundPosition,
    backgroundSize: '1588%',
    transform: 'rotateY(180deg)',
    backfaceVisibility: 'hidden',
  },
  back: {
    position: 'absolute',
    width: 'inherit',
    height: 'inherit',
    borderRadius: '6px',
    background: `url(${cardBack}) no-repeat`,
    backgroundSize: '100%',
    backfaceVisibility: 'hidden',
  },
}));

const EachCard = ({ distance, dragValue, dragEvent, rotated, cardData, beaten }) => {
  const backgroundPosition = `${cardData[1]}px ${cardData[2]}px`;
  const classes = useStyles({ distance, rotated, backgroundPosition, beaten });

  return (
    <Fade in={true}>
      <div className={classes.parent} draggable={dragValue} onDragStart={() => dragEvent(cardData)}>
        <div className={classes.card}>
          <div className={classes.face}></div>
          <div className={classes.back}></div>
        </div>
      </div>
    </Fade>
  );
};

EachCard.propTypes = {
  distance: PropTypes.number,
  dragEvent: PropTypes.func,
  rotated: PropTypes.bool,
  dragValue: PropTypes.bool,
  cardData: PropTypes.array,
  beaten: PropTypes.bool,
};

EachCard.defaultProps = {
  cardData: [],
};

export default EachCard;
