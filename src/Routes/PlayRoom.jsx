import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  ReadyComponent,
  Deck,
  Trump,
  DiscardPile,
  Player,
  GameField,
  ControlsComponent,
  ByPlayMessages,
} from 'Components';
import { setPlayRoomData, setClientIndex, assignPlayersInfo, definePlayersMove, setControlsState } from 'Store';
import { withStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import { assignIndexes } from 'Utilities';

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
};

class PlayRoom extends Component {
  componentDidMount() {
    const { socket, setPlayRoomData, setClientIndex, definePlayersMove, assignPlayersInfo, setReady } = this.props;

    socket.on('readyStage', PlayRoomData => {
      let player = PlayRoomData.players.find(item => item.id === socket.id);
      let startIndex = PlayRoomData.players.indexOf(player);
      setPlayRoomData(PlayRoomData);
      setClientIndex(startIndex);
    });

    socket.on('defineMove', () => {
      const { data } = this.props;
      definePlayersMove(data.curPlayer, data.defender, socket.id);
    });

    socket.on('syncData', PlayRoomData => {
      const { clientIndex } = this.props;
      setPlayRoomData(PlayRoomData);
      assignIndexes(clientIndex, PlayRoomData.playersNumber).forEach(assignPlayersInfo);
    });

    socket.on('endGame', () => {
      setReady(false);
      setControlsState({ activeTake: false, activeDiscard: false });
    });

    socket.on('startTimer', curPlayer => {
      const { turn } = this.props;
      if (curPlayer.id === socket.id && turn) {
        // if only the curPlayer is a client the timer starts and the progress line shows
        // this.start();
      }
    });
  }

  setReadyValue = () => {
    const { socket, setReady, nickname } = this.props;
    setReady(true);
    socket.emit('ready', nickname);
  };

  dragEvent = cardData => {
    console.log('TCL: PlayRoom -> cardData', cardData);
    const { socket, nickname } = this.props;
    socket.emit('initCard', nickname, cardData);
  };

  dragOverEvent = e => {
    if (!e) e = window.event;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  makeOffenceMove = () => {
    const { socket, turn, nickname } = this.props;
    if (turn) {
      socket.emit('makeOffenceMove', nickname);
    }
  };

  makeDefenceMove = () => {
    const { socket, turn, nickname } = this.props;

    if (turn) {
      socket.emit('makeDefenceMove', nickname);
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

  forbidMsg = () => {
    console.log('forbid');
  };

  start = () => {
    console.log('start');
  };

  render() {
    const {
      socket,
      isReady,
      data,
      classes,
      player0info,
      player1info,
      player2info,
      player3info,
      defenceOrOffence,
      activeTake,
      activeDiscard,
    } = this.props;
    const { usersReady, users, shuffledDeck, isFull, trumpData, discardPile, gameField, logMessages } = data;
    return (
      <>
        <ReadyComponent
          activeUsers={usersReady}
          users={users}
          isReady={isReady}
          isFull={isFull}
          setReadyState={this.setReadyValue}
        />
        <div role='presentation' onSelect={() => false} onMouseDown={() => false}>
          {usersReady && isFull && (
            <>
              <Container className={classes.cards}>
                <Deck deck={shuffledDeck} />
                <Trump trump={trumpData} />
              </Container>

              <DiscardPile data={discardPile} />

              <Player playerInfo={player0info} playerNumber={0} socket={socket} dragEvent={this.dragEvent} />
              <Player playerInfo={player1info} playerNumber={1} socket={socket} dragEvent={this.dragEvent} />
              <Player playerInfo={player2info} playerNumber={2} socket={socket} dragEvent={this.dragEvent} />
              <Player playerInfo={player3info} playerNumber={3} socket={socket} dragEvent={this.dragEvent} />

              <GameField
                gameField={gameField}
                onDragOver={this.dragOverEvent}
                onDrop={defenceOrOffence === 'offence' ? this.makeOffenceMove : this.makeDefenceMove}
              />

              <ControlsComponent
                takeCards={this.takeCards}
                discardCards={this.discardCards}
                activeTake={activeTake}
                activeDiscard={activeDiscard}
              />

              <ByPlayMessages messages={logMessages} />
            </>
          )}

          {/* <div id='gameOver' hidden={endGameVisible}>
            {PlayRoom.endGameMsg.nickName} {textsData[PlayRoom.endGameMsg.msgIndex]}
          </div> */}

          {/* <div className='forbidMsg' hidden={hidden}>
            {textsData[3]}
          </div> */}

          {/* <Timer timerBlock={timerBlock} widthValue={widthValue} text={textsData[9]} /> */}
        </div>
      </>
    );
  }
}

PlayRoom.propTypes = {
  clientIndex: PropTypes.number,
  nickname: PropTypes.string,
  defenceOrOffence: PropTypes.string,
  setReady: PropTypes.func,
  resetData: PropTypes.func,
  setClientIndex: PropTypes.func,
  setPlayRoomData: PropTypes.func,
  setControlsState: PropTypes.func,
  assignPlayersInfo: PropTypes.func,
  definePlayersMove: PropTypes.func,
  data: PropTypes.object,
  socket: PropTypes.object,
  classes: PropTypes.object,
  player0info: PropTypes.object,
  player1info: PropTypes.object,
  player2info: PropTypes.object,
  player3info: PropTypes.object,
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
  player0info: state.playRoomData.player0,
  player1info: state.playRoomData.player1,
  player2info: state.playRoomData.player2,
  player3info: state.playRoomData.player3,
  activeTake: state.playRoomData.activeTake,
  clientIndex: state.playRoomData.clientIndex,
  activeDiscard: state.playRoomData.activeDiscard,
  defenceOrOffence: state.playRoomData.defenceOrOffence,
});

const dispatch = dispatch => ({
  setPlayRoomData: data => {
    dispatch(setPlayRoomData(data));
  },
  setClientIndex: index => {
    dispatch(setClientIndex(index));
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
