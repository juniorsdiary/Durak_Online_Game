import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Ready, Deck, Trump, DiscardPile, Player } from 'Components';
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
    top: '28%',
    right: '10%',
    padding: '0',
  },
  board: {
    position: 'relative',
    flex: '1',
  },
};

class PlayRoom extends Component {
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

  makeOffenceMove = placeIndex => {
    const { socket, turn, nickname } = this.props;
    if (turn) {
      socket.emit('makeOffenceMove', nickname, placeIndex);
    }
  };

  makeDefenceMove = placeIndex => {
    const { socket, turn, nickname } = this.props;
    if (turn) {
      socket.emit('makeDefenceMove', nickname, placeIndex - 1);
    }
  };

  takeCards = () => {
    const { socket, setControlsState, nickname } = this.props;
    socket.emit('takeCards', nickname);
    setControlsState({ activeTake: false, activeDiscard: false });
  };

  discardCards = () => {
    const { socket, nickname } = this.props;
    socket.emit('discardCards', nickname);
  };

  render() {
    const { socket, isReady, data, classes, player0, player1, player2, player3, defenceOrOffence, activeTake, activeDiscard, textData } = this.props;
    const { usersReady, users, shuffledDeck, fullState, trumpData, discardPile, gameField, logMessages, endGame, players, interPhase } = data;
    if (usersReady && fullState) {
      const gameFieldNotEmpty = gameField.offenceCards.some(item => item);
      return (
        <Container onSelect={() => false} onMouseDown={() => false} className={classes.board} maxWidth='xl'>
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
          <Controls
            takeCards={this.takeCards}
            discardCards={this.discardCards}
            activeTake={activeTake}
            activeDiscard={activeDiscard && gameFieldNotEmpty && !interPhase}
            textData={textData}
          />
          <ByPlayMessages messages={logMessages} textData={textData} />
          <EndGame data={endGame} text={textData[8]} />
        </Container>
      );
    } else {
      return (
        <Ready activeUsers={usersReady} users={users} isReady={isReady} isFull={fullState} setReadyState={this.setReadyValue} textData={textData} />
      );
    }
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
  textData: PropTypes.array,
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
  nickname: state.commonData.userData.nickname,
  textData: state.commonData.typography.inGameMessages,
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
