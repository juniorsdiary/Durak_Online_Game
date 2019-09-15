const io = require('./main');
const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.setMaxListeners(100);

const DataHandler = require('./handlers');

const socketHandler = socket => {
  socket.on('connected', () => {
    io.sockets.emit('connected');
  });

  socket.on('authenticate', (nickname, cb) => {
    const isUsed = DataHandler.checkNicknames(nickname);
    if (isUsed) {
      cb({ isNickUsed: true });
    } else {
      socket.join('Lobby');
      DataHandler.joinRoom('Lobby', nickname);
      DataHandler.addUser(nickname, socket.id);
      DataHandler.updatePlayRoom('Lobby', nickname);
      const roomsAvailable = DataHandler.getAvalableRooms();
      const userData = DataHandler.connectedUsers.find(item => item.name === nickname);
      cb({ isNickUsed: false, userData });
      io.sockets.to('Lobby').emit('displayPlayers', DataHandler.connectedUsers);
      io.sockets.to('Lobby').emit('displayRooms', roomsAvailable);
      io.sockets.emit('syncMsgs', DataHandler.messages);
    }
  });

  socket.on('signout', nickname => {
    const isLoggedIn = DataHandler.checkUserConnection(nickname);
    if (isLoggedIn) {
      const room = DataHandler.getUserRoom(nickname);
      // const playRoom = gameManager.getPlayRoom(room);
      if (room !== 'Lobby') {
        // let index = findIndex(room, socket);
        //
        // let targetRoom = allRoomsInfo.filter(item => item.room === room)[0];
        //
        // let roomIndex = allRoomsInfo.indexOf(targetRoom);
        //
        // let player = playRoom.players.filter(item => item.id === socket.id);
        //
        // if (playRoom.gameInProgress && !player[0].active) {
        //   gameManager.deletePlayerFromRoom(room, index);
        // } else {
        //   gameManager.deletePlayerFromRoom(room, index);
        //
        //   playRoom.resetSettings();
        //
        //   playRoom.lastPlayer = undefined;
        //
        //   io.sockets.to(room).emit('resetEvent', playRoom);
        // }
        //
        // removeUser(connectedUsers, socket, nicknamesUsed, allRoomsInfo, currRoom, room);
        //
        // if (targetRoom.users.length === 0) {
        //   allRoomsInfo.splice(roomIndex, 1);
        // }
      } else {
        socket.leave(room);
        DataHandler.removeUser(nickname, room);
      }
      const roomsAvailable = DataHandler.getAvalableRooms();
      io.sockets.to('Lobby').emit('displayPlayers', DataHandler.connectedUsers);
      io.sockets.to('Lobby').emit('displayRooms', roomsAvailable);
    }
  });

  socket.on('sendMsg', ({ msg, nickname }) => {
    DataHandler.addMessage(msg, nickname);
    io.sockets.emit('addMsg', DataHandler.messages);
  });

  socket.on('createRoom', async ({ roomname, pass, access, players, cards, nickname }) => {
    const room = DataHandler.getUserRoom(nickname);
    socket.leave(room);
    DataHandler.leaveRoom(room, nickname);
    socket.join(roomname);
    DataHandler.joinRoom(roomname, nickname);
    DataHandler.updatePlayRoom(roomname, nickname);
    DataHandler.setSettings(roomname, pass, access, players, cards);
    const roomsAvailable = DataHandler.getAvalableRooms();
    io.sockets.to('Lobby').emit('displayPlayers', DataHandler.connectedUsers);
    io.sockets.to('Lobby').emit('displayRooms', roomsAvailable);

    // gameManager.initializeData(numberOfPlayers, numberOfCards, roomName, nickname, socket.id);
  });

  socket.on('disconnect', () => {
    const user = DataHandler.connectedUsers.find(item => item.id === socket.id);
    if (user) {
      let room = DataHandler.currRoom[user.name];
      // let playRoom = gameManager.getPlayRoom(room);
      if (room !== 'Lobby') {
        // let index = findIndex(room, socket);
        // let targetRoom = allRoomsInfo.filter(item => item.room === room)[0];
        // let roomIndex = allRoomsInfo.indexOf(targetRoom);
        // let player = playRoom.players.filter(item => item.id === socket.id);
        // if (playRoom.gameInProgress && !player[0].active) {
        //   gameManager.deletePlayerFromRoom(room, index);
        // } else {
        //   gameManager.deletePlayerFromRoom(room, index);
        //   playRoom.resetSettings();
        //   playRoom.lastPlayer = undefined;
        //   io.sockets.to(room).emit('resetEvent', playRoom);
        // }
        // removeUser(connectedUsers, socket, nicknamesUsed, allRoomsInfo, currRoom, room);
        // if (targetRoom.users.length === 0) {
        //   allRoomsInfo.splice(roomIndex, 1);
        // }
      } else {
        socket.leave(room);
        DataHandler.removeUser(user.name, room);
      }
      const roomsAvailable = DataHandler.getAvalableRooms();
      io.sockets.to('Lobby').emit('displayPlayers', DataHandler.connectedUsers);
      io.sockets.to('Lobby').emit('displayRooms', roomsAvailable);
    }
  });
};

module.exports = socketHandler;
