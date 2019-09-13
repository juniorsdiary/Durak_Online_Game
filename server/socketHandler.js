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
      cb({ isNickUsed: false });
      DataHandler.joinRoom(socket, 'Lobby', nickname);
      DataHandler.addUser(nickname, socket);
      DataHandler.updatePlayRoom('Lobby', nickname, socket);

      // const roomsAvailable = DataHandler.getAvalableRooms();
      const connectedUsers = DataHandler.connectedUsers;
      io.sockets.to('Lobby').emit('displayPlayers', connectedUsers);
      //
      // io.sockets.to('Lobby').emit('displayRooms', roomsAvailable);
      //
      // io.sockets.emit('addMsg', messages, connectedUsers);
    }
  });
};

module.exports = socketHandler;
