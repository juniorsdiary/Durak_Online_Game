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
  const { nickname, cards, id, position } = playerInfo;
  const classes = useStyles({ playerNumber });
  const renderCards = cards.map((item, index) => {
    let marginValue = id !== socket.id && position > 1 ? index * 20 : index * distance(cards.length);

    return (
      <EachCardComponent
        key={index}
        cardData={item}
        marginValue={marginValue}
        rotated={playerInfo.id === socket.id}
        dragValue={playerInfo.turn}
        dragEvent={dragEvent}
      />
    );
  });
  return (
    <div>
      <div className={classes.title}>{nickname}</div>
      <div className={classes.player}>{renderCards}</div>
    </div>
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
