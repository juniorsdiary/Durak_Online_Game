const io = require('./main');
const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.setMaxListeners(100);
const DataHandler = require('./DataHandler');
const GameManager = require('./GameManager');

const socketHandler = socket => {
  socket.on('authenticate', (nickname, cb) => {
    const isUsed = DataHandler.checkNicknames(nickname);
    if (isUsed) {
      cb({ error: true, errorMsg: `Nickname ${nickname} is used` });
    } else if (!nickname) {
      cb({ error: true, errorMsg: `Nickname can not be empty` });
    } else {
      socket.join('Lobby');
      DataHandler.joinRoom('Lobby', nickname);
      DataHandler.addUser(nickname, socket.id);
      DataHandler.updatePlayRoom('Lobby', nickname);
      const roomsAvailable = DataHandler.getAvailableRooms();
      const userData = DataHandler.connectedUsers.find(item => item.name === nickname);
      cb({ error: false, userData, errorMsg: `` });
      io.sockets.to('Lobby').emit('displayPlayers', DataHandler.connectedUsers);
      io.sockets.to('Lobby').emit('displayRooms', roomsAvailable);
      io.sockets.emit('syncMessages', DataHandler.messages);
    }
  });

  socket.on('signout', nickname => {
    const isLoggedIn = DataHandler.checkUserConnection(nickname);
    if (isLoggedIn) {
      const room = DataHandler.getUserRoom(nickname);
      const playRoom = GameManager.getPlayRoom(room);
      if (room !== 'Lobby') {
        const index = GameManager.findIndex(room, nickname);
        const targetRoom = DataHandler.allRoomsInfo.find(item => item.room === room);
        const roomIndex = DataHandler.allRoomsInfo.indexOf(targetRoom);
        const player = playRoom.players.find(item => item.id === socket.id);
        if (playRoom.gameInProgress && !player.active) {
          GameManager.deletePlayerFromRoom(room, index);
        } else {
          GameManager.deletePlayerFromRoom(room, index);
          playRoom.resetSettings();
          playRoom.lastPlayer = undefined;
          io.sockets.to(room).emit('resetEvent', playRoom);
        }
        if (targetRoom.users.length === 0) {
          DataHandler.allRoomsInfo.splice(roomIndex, 1);
        }
      }
      socket.leave(room);
      DataHandler.removeUser(nickname, room);
      const roomsAvailable = DataHandler.getAvailableRooms();
      io.sockets.to('Lobby').emit('displayPlayers', DataHandler.connectedUsers);
      io.sockets.to('Lobby').emit('displayRooms', roomsAvailable);
    }
  });

  socket.on('sendMessage', ({ msg, nickname }) => {
    DataHandler.addMessage(msg, nickname);
    io.sockets.emit('addMessage', DataHandler.messages);
  });

  socket.on('disconnect', () => {
    const user = DataHandler.connectedUsers.find(item => item.id === socket.id);
    if (user) {
      const room = DataHandler.getUserRoom(user.name);
      const playRoom = GameManager.getPlayRoom(room);
      if (room !== 'Lobby') {
        const index = GameManager.findIndex(room, user.name);
        const targetRoom = DataHandler.allRoomsInfo.find(item => item.room === room);
        const roomIndex = DataHandler.allRoomsInfo.indexOf(targetRoom);
        const player = playRoom.players.find(item => item.id === socket.id);
        if (playRoom.gameInProgress && !player.active) {
          GameManager.deletePlayerFromRoom(room, index);
        } else {
          GameManager.deletePlayerFromRoom(room, index);
          playRoom.resetSettings();
          playRoom.lastPlayer = undefined;
          io.sockets.to(room).emit('resetEvent', playRoom);
        }
        if (targetRoom.users.length === 0) DataHandler.allRoomsInfo.splice(roomIndex, 1);
      }
      DataHandler.removeUser(user.name, room);
      socket.leave(room);
      const roomsAvailable = DataHandler.getAvailableRooms();
      io.sockets.to('Lobby').emit('displayPlayers', DataHandler.connectedUsers);
      io.sockets.to('Lobby').emit('displayRooms', roomsAvailable);
    }
  });

  socket.on('createRoom', ({ roomName, password, access, players, cards, nickname }) => {
    const room = DataHandler.getUserRoom(nickname);

    socket.leave(room, () => {
      DataHandler.leaveRoom(room, nickname);
    });
    socket.join(roomName, () => {
      DataHandler.joinRoom(roomName, nickname);
      DataHandler.updatePlayRoom(roomName, nickname);
      DataHandler.setSettings(roomName, password, access, players, cards);
      const roomsAvailable = DataHandler.getAvailableRooms();
      io.sockets.to('Lobby').emit('displayPlayers', DataHandler.connectedUsers);
      io.sockets.to('Lobby').emit('displayRooms', roomsAvailable);
      GameManager.initializeData(players, cards, roomName, nickname, socket.id);
    });
  });

  socket.on('joinRoom', (roomName, nickname) => {
    const room = DataHandler.getUserRoom(nickname);
    socket.leave(room, () => {
      DataHandler.leaveRoom(room, nickname);
    });
    socket.join(roomName, () => {
      DataHandler.joinRoom(roomName, nickname);
      DataHandler.updatePlayRoom(roomName, nickname);
      const roomsAvailable = DataHandler.getAvailableRooms();
      io.sockets.to('Lobby').emit('displayPlayers', DataHandler.connectedUsers);
      io.sockets.to('Lobby').emit('displayRooms', roomsAvailable);
      GameManager.addUser(roomName, nickname, socket.id);
      const playRoom = GameManager.getPlayRoom(roomName);
      if (playRoom.users.length === +playRoom.numberOfPlayers) {
        io.sockets.to(roomName).emit('readyStage', playRoom);
      }
    });
  });

  socket.on('ready', nickname => {
    const room = DataHandler.getUserRoom(nickname);
    let index = GameManager.findIndex(room, nickname);
    let playRoom = GameManager.getPlayRoom(room);
    playRoom.activateUser(index);
    let numberOfUsersReady = playRoom.usersReady.filter(item => item).length;
    if (numberOfUsersReady === +playRoom.numberOfPlayers) {
      playRoom.dealCards();
      io.sockets.to(room).emit('syncData', playRoom, room);
      io.sockets.to(room).emit('defineMove');
    }
  });

  socket.on('initCard', (nickname, cardData) => {
    const room = DataHandler.getUserRoom(nickname);
    const index = GameManager.findIndex(room, nickname);
    GameManager.getPlayRoom(room).players[index].curCard = cardData;
  });

  socket.on('makeOffenceMove', nickname => {
    const room = DataHandler.getUserRoom(nickname);
    const playRoom = GameManager.getPlayRoom(room);
    playRoom.makeOffenceMove();
    io.sockets.to(room).emit('syncData', playRoom);
    if (!playRoom.endGame) {
      io.sockets.to(room).emit('defineMove');
    } else {
      playRoom.resetSettings();
      io.sockets.to(room).emit('endGame');
      if (playRoom.users.length === +playRoom.numberOfPlayers) {
        io.sockets.to(room).emit('readyStage', playRoom);
      }
    }
  });

  socket.on('makeDeffenceMove', nickname => {
    const room = DataHandler.getUserRoom(nickname);
    const playRoom = GameManager.getPlayRoom(room);
    playRoom.makeDefenceMove();
    io.sockets.to(room).emit('syncData', playRoom);
    if (!playRoom.endGame) {
      io.sockets.to(room).emit('defineMove');
    } else {
      playRoom.resetSettings();
      if (playRoom.users.length === +playRoom.numberOfPlayers) {
        io.sockets.to(room).emit('readyStage', playRoom);
      }
      io.sockets.to(room).emit('endGame');
    }
  });

  socket.on('takeOrDiscard', (nickname, value) => {
    const room = DataHandler.getUserRoom(nickname);
    const index = GameManager.findIndex(room, nickname);
    const playRoom = GameManager.getPlayRoom(room);
    playRoom.players[index].takeCards(value);
    io.sockets.to(room).emit('syncData', playRoom);
    io.sockets.to(room).emit('defineMove');
  });

  socket.on('interPhase', nickname => {
    const room = DataHandler.getUserRoom(nickname);
    const index = GameManager.findIndex(room, nickname);
    const playRoom = GameManager.getPlayRoom(room);
    playRoom.interPhase = true;
    playRoom.countCardsToTake();
    if (playRoom.curPlayer.active) {
      playRoom.defineMove(true, false, 'offence', '');
      io.sockets.to(room).emit('logMessages', playRoom.logMessages);
      io.sockets.to(room).emit('defineMove');
      io.sockets.to(room).emit('syncData', playRoom);
      io.sockets.to(room).emit('startTimer', playRoom.curPlayer);
      setTimeout(() => {
        playRoom.players[index].takeCards(true);
        io.sockets.to(room).emit('syncData', playRoom);
        io.sockets.to(room).emit('defineMove');
      }, 5000);
    } else {
      playRoom.players[index].takeCards(true);
      io.sockets.to(room).emit('syncData', playRoom);
      io.sockets.to(room).emit('defineMove');
    }
  });

  socket.on('changeLng', (lng, cb) => {
    if (lng === 'RU') {
      // cb(textsData.russian);
    } else if (lng === 'EN') {
      // cb(textsData.english);
    }
  });
};

module.exports = socketHandler;
