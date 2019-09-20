import React from 'react';
import PropTypes from 'prop-types';
import { EachCardComponent } from 'Components';
import { makeStyles } from '@material-ui/styles';
import { definePlayerTitleStyle, definePlayerStyle, distance } from 'Utilities';

const useStyles = makeStyles({
  title: props => ({ position: 'absolute', ...definePlayerTitleStyle(props.playerNumber) }),
  player: props => ({ position: 'absolute', ...definePlayerStyle(props.playerNumber) }),
});

const Player = ({ socket, playerInfo, playerNumber, dragEvent }) => {
  const { nickname, cards, id, turn } = playerInfo;
  const classes = useStyles({ playerNumber });

  const renderCards = cards.map((item, index) => {
    const margin = id === socket.id ? index * 20 : index * distance(cards.length);

    return (
      <EachCardComponent
        key={index}
        cardData={item}
        margin={`0 0 0 ${margin}`}
        rotated={id === socket.id}
        dragValue={turn}
        dragEvent={dragEvent}
      />
    );
  });
  return (
    <>
      <div className={classes.title}>{nickname}</div>
      <div className={classes.player}>{renderCards}</div>
    </>
  );
};

Player.propTypes = {
  socket: PropTypes.object,
  playerInfo: PropTypes.object,
  playerNumber: PropTypes.number,
  dragEvent: PropTypes.func,
};
Player.defaultProps = {
  playerInfo: {
    cards: [],
  },
};

export default Player;
