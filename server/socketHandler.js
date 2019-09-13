const io = require('./main');
const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.setMaxListeners(100);

const socketHandler = socket => {
  socket.on('connected', () => {
    io.sockets.emit('connected');
  });
};

module.exports = socketHandler;
