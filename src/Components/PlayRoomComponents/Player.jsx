import React from 'react';
import PropTypes from 'prop-types';
import { EachCard } from 'Components';
import { makeStyles } from '@material-ui/core/styles';
import { definePlayerStyle, distance } from 'Utilities';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  title: props => ({ position: 'absolute', bottom: '-20%', left: '50%', transform: 'translate(-50%, 0)' }),
  player: props => ({ position: 'absolute', width: '350px', height: '141px', ...definePlayerStyle(props.playerNumber) }),
});

const Player = ({ socket, playerInfo, playerNumber, dragEvent }) => {
  const { nickname, cards, id } = playerInfo;
  const classes = useStyles({ playerNumber, nickname });

  const renderCards = cards.map((item, index) => {
    return <EachCard key={item.id} cardData={item} distance={index * distance(cards.length)} rotated={id === socket.id} dragEvent={dragEvent} dragValue={id === socket.id} />;
  });
  return (
    <Grid container direction='column' className={classes.player}>
      {renderCards}
      {id !== socket.id && (
        <Typography variant='h6' className={classes.title}>
          {nickname}
        </Typography>
      )}
    </Grid>
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
