const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
console.log('creating server');
app.use(express.static('public'));
app.get('/', function(req, res) {
  res.sendFile('./index.html');
});
app.get('/lobby', function(req, res) {
  res.sendFile('./index.html');
});
app.get('/login', function(req, res) {
  res.sendFile('./index.html');
});
app.get('*.js', function(req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});
const server = app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});
const io = (module.exports = require('socket.io')(server));
const socketHandler = require('./socketHandler');
io.on('connection', socketHandler);
