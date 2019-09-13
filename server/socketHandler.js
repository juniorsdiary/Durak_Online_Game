const io = require('./main');
const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.setMaxListeners(100);

const {
  isNickUsed,
  // isRoomCreated,
  // addUser,
  // removeUser,
  // joinRoom,
  // updatePlayRoom,
  // setSettings,
  // isRoomFull,
  // findRoomIndex,
  // broadcastData,
  // leavePrevRoom,
} = require('./handlers');

const socketHandler = socket => {
  socket.on('connected', () => {
    io.sockets.emit('connected');
  });

  socket.on('authenticate', (nickname, cb) => {
    cb({ isNickUsed: isNickUsed(nickname) });
  });
};

module.exports = socketHandler;
