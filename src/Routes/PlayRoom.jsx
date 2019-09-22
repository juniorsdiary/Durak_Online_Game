import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Ready, Deck, Trump, DiscardPile, Player, SystemMessage } from 'Components';
import { GameField, Controls, ByPlayMessages, EndGame } from 'Components';
import { setPlayRoomData, assignPlayersInfo, definePlayersMove, setControlsState } from 'Store';
import { assignIndexes } from 'Utilities';
import { Container } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = {
  cards: {
    width: '250px',
    display: 'flex',
    justifyContent: 'space-around',
    position: 'absolute',
    top: '10%',
    left: '10%',
    padding: '0',
  },
  board: {
    position: 'relative',
    flex: '1',
  },
};

class PlayRoom extends Component {
  state = {
    warning: true,
  };
  componentDidMount() {
    const { socket, setPlayRoomData, definePlayersMove, assignPlayersInfo, setReady } = this.props;

    socket.on('readyStage', PlayRoomData => {
      let player = PlayRoomData.players.find(item => item.id === socket.id);
      let startIndex = PlayRoomData.players.indexOf(player);
      setPlayRoomData(PlayRoomData);
      assignIndexes(startIndex, PlayRoomData.playersNumber).forEach(assignPlayersInfo);
    });

    socket.on('defineMove', () => {
      const { data } = this.props;
      definePlayersMove(data.curPlayer, data.defender, socket.id);
    });

    socket.on('syncData', PlayRoomData => {
      setPlayRoomData(PlayRoomData);
    });

    socket.on('endGame', () => {
      setReady(false);
      setControlsState({ activeTake: false, activeDiscard: false });
    });

    socket.on('startTimer', curPlayer => {
      const { turn } = this.props;
      if (curPlayer.id === socket.id && turn) {
        // if only the curPlayer is a client the timer starts and the progress line shows
        this.start();
      }
    });
  }

  setReadyValue = () => {
    const { socket, setReady, nickname } = this.props;
    setReady(true);
    socket.emit('ready', nickname);
  };

  dragEvent = cardData => {
    const { socket, nickname } = this.props;
    socket.emit('initCard', nickname, cardData);
  };

  dragOverEvent = e => {
    if (!e) e = window.event;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  makeOffenceMove = placeIndex => {
    const { socket, turn, nickname } = this.props;
    if (turn) {
      socket.emit('makeOffenceMove', nickname, placeIndex);
    } else {
      this.warnPlayer();
    }
  };

  makeDefenceMove = placeIndex => {
    const { socket, turn, nickname } = this.props;
    if (turn) {
      socket.emit('makeDefenceMove', nickname, placeIndex - 1);
    } else {
      this.warnPlayer();
    }
  };

  takeCards = () => {
    const { socket, activeTake, setControlsState, nickname } = this.props;
    if (activeTake) {
      socket.emit('interPhase', nickname);
      setControlsState({ activeTake: false, activeDiscard: false });
    }
  };

  discardCards = () => {
    const { socket, activeDiscard, nickname } = this.props;

    if (activeDiscard) {
      socket.emit('takeOrDiscard', nickname, false);
    }
  };

  warnPlayer = () => {
    this.setState({ warning: false });
    setTimeout(() => {
      this.setState({ warning: true });
    }, 1500);
  };

  start = () => {
    console.log('start');
  };

  render() {
    const { socket, isReady, data, classes, player0, player1, player2, player3, defenceOrOffence, activeTake, activeDiscard } = this.props;
    const { warning } = this.state;
    const { usersReady, users, shuffledDeck, isFull, trumpData, discardPile, gameField, logMessages, endGame, players } = data;
    return (
      <div role='presentation' onSelect={() => false} onMouseDown={() => false} className={classes.board}>
        <Ready activeUsers={usersReady} users={users} isReady={isReady} isFull={isFull} setReadyState={this.setReadyValue} />

        {usersReady && isFull && (
          <>
            <Container className={classes.cards}>
              <Deck deck={shuffledDeck} />
              <Trump trump={trumpData} />
            </Container>
            <DiscardPile data={discardPile} />

            <Player playerInfo={players[player0]} playerNumber={0} socket={socket} dragEvent={this.dragEvent} />
            <Player playerInfo={players[player1]} playerNumber={1} socket={socket} dragEvent={this.dragEvent} />
            <Player playerInfo={players[player2]} playerNumber={2} socket={socket} dragEvent={this.dragEvent} />
            <Player playerInfo={players[player3]} playerNumber={3} socket={socket} dragEvent={this.dragEvent} />

            <GameField
              gameField={gameField}
              onDragOver={this.dragOverEvent}
              onDrop={defenceOrOffence === 'offence' ? this.makeOffenceMove : this.makeDefenceMove}
            />
            <Controls takeCards={this.takeCards} discardCards={this.discardCards} activeTake={activeTake} activeDiscard={activeDiscard} />
            <ByPlayMessages messages={logMessages} />
            <EndGame data={endGame} />
            <SystemMessage warning={warning} />
          </>
        )}
        {/* <Timer timerBlock={timerBlock} widthValue={widthValue} text={textsData[9]} /> */}
      </div>
    );
  }
}

PlayRoom.propTypes = {
  nickname: PropTypes.string,
  defenceOrOffence: PropTypes.string,
  setReady: PropTypes.func,
  resetData: PropTypes.func,
  setPlayRoomData: PropTypes.func,
  setControlsState: PropTypes.func,
  assignPlayersInfo: PropTypes.func,
  definePlayersMove: PropTypes.func,
  data: PropTypes.object,
  socket: PropTypes.object,
  classes: PropTypes.object,
  player0: PropTypes.number,
  player1: PropTypes.number,
  player2: PropTypes.number,
  player3: PropTypes.number,
  turn: PropTypes.bool,
  isReady: PropTypes.bool,
  activeTake: PropTypes.bool,
  activeDiscard: PropTypes.bool,
};

const props = state => ({
  socket: state.authentication.socket,
  nickname: state.commonData.userData.user,
  turn: state.playRoomData.turn,
  data: state.playRoomData.playRoom,
  isReady: state.playRoomData.isReady,
  player0: state.playRoomData.player0,
  player1: state.playRoomData.player1,
  player2: state.playRoomData.player2,
  player3: state.playRoomData.player3,
  activeTake: state.playRoomData.activeTake,
  activeDiscard: state.playRoomData.activeDiscard,
  defenceOrOffence: state.playRoomData.defenceOrOffence,
});

const dispatch = dispatch => ({
  setPlayRoomData: data => {
    dispatch(setPlayRoomData(data));
  },
  assignPlayersInfo: (number, index) => {
    dispatch(assignPlayersInfo(number, index));
  },
  definePlayersMove: (curPlayer, defender, id) => {
    dispatch(definePlayersMove(curPlayer, defender, id));
  },
  setControlsState: data => {
    dispatch(setControlsState(data));
  },
  resetData: () => {
    dispatch({ type: 'RESET_DATA' });
  },
  setReady: value => {
    dispatch({ type: 'SET_READY', payload: value });
  },
});

const ReduxConnected = connect(
  props,
  dispatch
)(PlayRoom);
const StyledComponent = withStyles(styles)(ReduxConnected);

export default StyledComponent;
