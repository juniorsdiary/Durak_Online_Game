import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ReadyComponent, Deck, Trump } from 'Components';
import { setPlayRoomData, setClientIndex, assignPlayersInfo, definePlayersMove } from 'Store';
import { withStyles } from '@material-ui/styles';

const styles = {};

class PlayRoom extends Component {
  componentDidMount() {
    const { socket, setPlayRoomData, setClientIndex, definePlayersMove, assignPlayersInfo } = this.props;
    socket.on('readyStage', (PlayRoomData, roomName) => {
      let player = PlayRoomData.players.find(item => item.id === socket.id);
      let startIndex = PlayRoomData.players.indexOf(player);
      setPlayRoomData(PlayRoomData);
      setClientIndex(startIndex);
    });
    socket.on('initialSync', (PlayRoomData, roomName) => {
      const { clientIndex } = this.props;
      setPlayRoomData(PlayRoomData);
      this.assignIndexes(clientIndex, PlayRoomData.numberOfPlayers).forEach(assignPlayersInfo);
    });
    socket.on('defineMove', () => {
      const { data } = this.props;
      definePlayersMove(data.curPlayer, data.defender, socket.id);
    });
  }
  setReadyValue = () => {
    const { socket, setReady, nickname } = this.props;
    setReady();
    socket.emit('ready', nickname);
  };
  definePlayerIndex(index, players, addIndex) {
    return index + addIndex >= players ? index + addIndex - players : index + addIndex;
  }
  assignIndexes(index, players) {
    let index1 = index;
    let index2 = this.definePlayerIndex(index, players, 1);
    let index3 = players >= 3 ? this.definePlayerIndex(index, players, 2) : -1;
    let index4 = players === 4 ? this.definePlayerIndex(index, players, 3) : -1;
    return [index1, index2, index3, index4];
  }
  render() {
    const { isReady, data } = this.props;
    const isUsersReady = data.usersReady && data.usersReady.every(item => item);
    return (
      <>
        <ReadyComponent activeUsers={isUsersReady} users={data.users} isReady={isReady} setReadyState={this.setReadyValue} />
        <div role='presentation' className='board' onSelect={() => false} onMouseDown={() => false}>
          <Deck deck={data.shuffledDeck} />
          {isUsersReady && <Trump trump={data.trumpData} />}

          {/* <div className='discardPile'>{renderDiscardPile}</div> */}

          {/* <Timer timerBlock={timerBlock} widthValue={widthValue} text={textsData[9]} /> */}

          {/* <Player
            playerInfo={player1Info}
            className={'player1'}
            socket={socket}
            playerTitle={'player1Title'}
            roomName={roomName}
            forbidMsg={this.forbidMsg}
          /> */}

          {/* <Player
            playerInfo={player2Info}
            className={'player2'}
            socket={socket}
            playerTitle={'player2Title'}
            roomName={roomName}
            forbidMsg={this.forbidMsg}
          /> */}

          {/* <Player
            playerInfo={player3Info}
            className={'player3'}
            socket={socket}
            playerTitle={'player3Title'}
            roomName={roomName}
            forbidMsg={this.forbidMsg}
          /> */}

          {/* <Player
            playerInfo={player4Info}
            className={'player4'}
            socket={socket}
            playerTitle={'player4Title'}
            roomName={roomName}
            forbidMsg={this.forbidMsg}
          /> */}

          {/* <GameField
            turn={turn}
            socket={socket}
            roomName={roomName}
            offenceCards={gameFieldOffenceCards ? gameFieldOffenceCards : []}
            defenceCards={gameFieldDeffenceCards}
            defenceOrOffence={defenceOrOffence}
          /> */}

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
};

const props = state => ({
  socket: state.authentication.socket,
  data: state.playRoomData.playRoom,
  isReady: state.playRoomData.isReady,
  nickname: state.commonData.userData.name,
  clientIndex: state.playRoomData.clientIndex,
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
