const express = require('express');
const app = express();
const compression = require('compression');
const PORT = process.env.PORT || 8080;
app.use(compression({ filter: shouldCompress }));
function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    return false;
  }
  return compression.filter(req, res);
}
// app.use(express.static('public'));
// app.use('*.js', function(req, res, next) {
//   req.url = req.url + '.gz';
//   res.set('Content-Encoding', 'gzip');
//   next();
// });
app.get('/', function(req, res) {
  res.sendFile('./index.html');
});
app.get('/lobby', function(req, res) {
  res.sendFile('./index.html');
});
app.get('/login', function(req, res) {
  res.sendFile('./index.html');
});

const server = app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});
const io = (module.exports = require('socket.io')(server));
const socketHandler = require('./socketHandler');
io.on('connection', socketHandler);
