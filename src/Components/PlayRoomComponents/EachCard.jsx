import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
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
    opacity: props => props.opacity,
    zIndex: props => (props.beaten ? 1 : 0),
  },
  previewCard: {
    width: '100px',
    height: '141px',
    backgroundPosition: props => props.backgroundPosition,
    backgroundSize: '1588%',
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

const EachCard = ({ distance, dragEvent, rotated, cardData, beaten }) => {
  const [{ opacity }, drag] = useDrag({
    item: { type: 'card' },
    begin: () => {
      dragEvent(cardData);
    },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });
  const backgroundPosition = `${cardData.posX}px ${cardData.posY}px`;
  const classes = useStyles({ distance, rotated, backgroundPosition, beaten, opacity });
  return (
    <Fade in={true}>
      <div ref={drag} className={classes.parent}>
        <div className={classes.card}>
          <div className={classes.back}></div>
          <div className={classes.face}></div>
        </div>
      </div>
    </Fade>
  );
};

EachCard.propTypes = {
  distance: PropTypes.number,
  dragEvent: PropTypes.func,
  rotated: PropTypes.bool,
  cardData: PropTypes.object,
  beaten: PropTypes.bool,
};

EachCard.defaultProps = {
  cardData: {},
};

export default EachCard;
