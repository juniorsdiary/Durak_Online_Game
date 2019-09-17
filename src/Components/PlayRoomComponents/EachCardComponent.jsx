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
    // backgroundPosition: `${0}px ${0}px`,
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

export default function EachCardComponent({ marginValue, dragValue, dragEvent, dataValue, rotated, dataSuit, posY, posX }) {
  const classes = useStyles({ marginValue, rotated, backgroundPosition: `${posX} ${posY}` });
  return (
    <div className={classes.parent} draggable={dragValue} onDragStart={dragEvent}>
      <div className={classes.card} datasuit={dataSuit} datavalue={dataValue}>
        <div className={classes.face}></div>
        <div className={classes.back}></div>
      </div>
    </div>
  );
}
EachCardComponent.propTypes = {
  marginValue: PropTypes.number,
  dragValue: PropTypes.bool,
  dragEvent: PropTypes.func,
  dataValue: PropTypes.number,
  rotated: PropTypes.bool,
  dataSuit: PropTypes.string,
  posY: PropTypes.string,
  posX: PropTypes.string,
};
