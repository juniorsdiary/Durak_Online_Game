import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ReadyComponent, Deck, Trump, DiscardPile, Player, GameField } from 'Components';
import { setPlayRoomData, setClientIndex, assignPlayersInfo, definePlayersMove } from 'Store';
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
    const { socket, setPlayRoomData, setClientIndex, definePlayersMove, assignPlayersInfo } = this.props;
    socket.on('readyStage', PlayRoomData => {
      let player = PlayRoomData.players.find(item => item.id === socket.id);
      let startIndex = PlayRoomData.players.indexOf(player);
      setPlayRoomData(PlayRoomData);
      setClientIndex(startIndex);
    });
    socket.on('initialSync', PlayRoomData => {
      const { clientIndex } = this.props;
      setPlayRoomData(PlayRoomData);
      assignIndexes(clientIndex, PlayRoomData.numberOfPlayers).forEach(assignPlayersInfo);
    });
    socket.on('defineMove', () => {
      const { data } = this.props;
      definePlayersMove(data.curPlayer, data.defender, socket.id);
    });
    socket.on('syncData', PlayRoomData => {
      const { clientIndex } = this.props;
      setPlayRoomData(PlayRoomData);
      assignIndexes(clientIndex, PlayRoomData.numberOfPlayers).forEach(assignPlayersInfo);
    });
  }
  setReadyValue = () => {
    const { socket, setReady, nickname } = this.props;
    setReady();
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

  makeOffenceMove = () => {
    const { socket, turn, nickname } = this.props;
    if (turn) {
      socket.emit('makeOffenceMove', nickname);
    }
  };

  makeDefenceMove = () => {
    const { socket, turn } = this.props;

    if (turn) {
      socket.emit('makeDeffenceMove');
    }
  };

  forbidMsg = () => {
    // this.setState(prevState => {
    //   return {
    //     hidden: !prevState.hidden,
    //   };
    // });
    //
    // setTimeout(() => {
    //   this.setState(prevState => {
    //     return {
    //       hidden: !prevState.hidden,
    //     };
    //   });
    // }, 1500);
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
    } = this.props;
    const isUsersReady = data.usersReady && data.usersReady.every(item => item);

    return (
      <>
        <ReadyComponent
          activeUsers={isUsersReady}
          users={data.users}
          isReady={isReady}
          setReadyState={this.setReadyValue}
        />
        <div role='presentation' onSelect={() => false} onMouseDown={() => false}>
          {isUsersReady && (
            <>
              <Container className={classes.cards}>
                <Deck deck={data.shuffledDeck} />
                <Trump trump={data.trumpData} />
              </Container>
              <DiscardPile data={data.discardPile} />
              <Player playerInfo={player0info} playerNumber={0} socket={socket} dragEvent={this.dragEvent} />
              <Player playerInfo={player1info} playerNumber={1} socket={socket} dragEvent={this.dragEvent} />
              <Player playerInfo={player2info} playerNumber={2} socket={socket} dragEvent={this.dragEvent} />
              <Player playerInfo={player3info} playerNumber={3} socket={socket} dragEvent={this.dragEvent} />
              <GameField
                gameField={data.gameField}
                onDragOver={this.dragOverEvent}
                onDrop={defenceOrOffence === 'offence' ? this.makeOffenceMove : this.makeDefenceMove}
              />
            </>
          )}

          {/* <div id='gameOver' hidden={endGameVisible}>
            {PlayRoom.endGameMsg.nickName} {textsData[PlayRoom.endGameMsg.msgIndex]}
          </div> */}

          {/* <div className='forbidMsg' hidden={hidden}>
            {textsData[3]}
          </div> */}

          {/* <div className='logBlock'>{renderLogMsgs}</div> */}

          {/* <div className='controls'>
            <button id='take' className={activeTake ? 'take activeBtn' : 'take inactiveBtn'} onClick={this.takeCards}>
              Take
            </button>

            <button id='discard' className={activeDiscard ? 'discard activeBtn' : 'discard inactiveBtn'} onClick={this.discardCards}>
              Discard
            </button>
          </div> */}
          {/* <Timer timerBlock={timerBlock} widthValue={widthValue} text={textsData[9]} /> */}
        </div>
      </>
    );
  }
}

PlayRoom.propTypes = {
  socket: PropTypes.object,
  setPlayRoomData: PropTypes.func,
  data: PropTypes.object,
  setReady: PropTypes.func,
  isReady: PropTypes.bool,
  nickname: PropTypes.string,
  clientIndex: PropTypes.number,
  setClientIndex: PropTypes.func,
  assignPlayersInfo: PropTypes.func,
  definePlayersMove: PropTypes.func,
  classes: PropTypes.object,
  player0info: PropTypes.object,
  player1info: PropTypes.object,
  player2info: PropTypes.object,
  player3info: PropTypes.object,
  turn: PropTypes.bool,
  defenceOrOffence: PropTypes.string,
};

const props = state => ({
  socket: state.authentication.socket,
  data: state.playRoomData.playRoom,
  isReady: state.playRoomData.isReady,
  nickname: state.commonData.userData.name,
  clientIndex: state.playRoomData.clientIndex,
  player0info: state.playRoomData.player0,
  player1info: state.playRoomData.player1,
  player2info: state.playRoomData.player2,
  player3info: state.playRoomData.player3,
  turn: state.playRoomData.turn,
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
  setReady: () => {
    dispatch({ type: 'SET_READY', payload: true });
  },
});

const ReduxConnected = connect(
  props,
  dispatch
)(PlayRoom);
const StyledComponent = withStyles(styles)(ReduxConnected);

export default StyledComponent;
