// const http = require('http').createServer();
const app = require('express')();
const PORT = process.env.PORT || 8080;
console.log('creating server');
app.get('/', (req, res) => {
  res.send('index.html');
});
const server = app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});
const io = (module.exports = require('socket.io')(server));
const socketHandler = require('./socketHandler');
io.on('connection', socketHandler);
