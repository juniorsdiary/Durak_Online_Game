import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import cardDeck from '../../images/free-vector-card-deck.jpg';
import cardBack from '../../images/back.jpg';

const useStyles = makeStyles(() => ({
  parent: {
    marginLeft: props => `${props.marginValue}px`,
    position: 'absolute',
    width: '100px',
    height: '141px',
    perspective: '1000px',
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
    position: 'relative',
    width: 'inherit',
    height: 'inherit',
    borderRadius: '6px',
    background: `url(${cardBack}) no-repeat`,
    backgroundSize: '100%',
    backfaceVisibility: 'hidden',
  },
}));

export default function EachCardComponent({ marginValue, dragValue, dragEvent, rotated, cardData }) {
  const backgroundPosition = `${cardData[1]}px ${cardData[2]}px`;
  const classes = useStyles({ marginValue, rotated, backgroundPosition });

  return (
    <div className={classes.parent} draggable={dragValue} onDragStart={dragEvent}>
      <div className={classes.card} datasuit={cardData[0]} datavalue={cardData[3]}>
        <div className={classes.face}></div>
        <div className={classes.back}></div>
      </div>
    </div>
  );
}

EachCardComponent.propTypes = {
  marginValue: PropTypes.number,
  dragEvent: PropTypes.func,
  rotated: PropTypes.bool,
  dragValue: PropTypes.bool,
  cardData: PropTypes.array,
};

EachCardComponent.defaultProps = {
  cardData: [],
};
