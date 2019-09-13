// let connectedUsers = {},
// messages = [],
// allRoomsInfo = [],
// currRoom = {},
// roomsNamesUsed = [],
let nicknamesUsed = [];

const isNickUsed = nickname => {
  return nicknamesUsed.includes(nickname);
};

const isRoomCreated = (roomName, roomsNamesUsed) => {
  return roomsNamesUsed.indexOf(roomName) !== -1;
};

const addUser = (nickname, socket, connectedUsers, currRoom, nicknamesUsed, gameMsgs) => {
  nicknamesUsed.push(nickname);

  connectedUsers[socket.id] = { id: socket.id, name: nickname, connectTime: new Date(), inGameMessages: gameMsgs };
};

const removeUser = (connectedUsers, socket, nicknamesUsed, allRoomsInfo, currRoom, room) => {
  let targetRoom = allRoomsInfo.filter(item => item.room === room)[0];

  if (targetRoom) {
    targetRoom.users.splice(targetRoom.users.indexOf(connectedUsers[socket.id].name), 1);

    nicknamesUsed.splice(nicknamesUsed.indexOf(connectedUsers[socket.id].name), 1);

    delete currRoom[connectedUsers[socket.id].name];

    socket.leave(connectedUsers[socket.id].room);

    delete connectedUsers[socket.id];
  }
};

const joinRoom = (socket, roomName, nickname, allRoomsInfo, currRoom, roomsNamesUsed) => {
  socket.join(roomName);

  currRoom[nickname] = roomName;

  if (!isRoomCreated(roomName, roomsNamesUsed)) {
    roomsNamesUsed.push(roomName);

    allRoomsInfo.push({ room: roomName, users: [], settings: '' });
  }
};

const updatePlayRoom = (roomName, nickname, allRoomsInfo, connectedUsers, socket) => {
  allRoomsInfo.filter(item => item.room === roomName)[0].users.push(nickname);

  connectedUsers[socket.id].room = roomName;
};

const setSettings = (roomName, pass, isPrivate, numberOfPlayers, numberOfCards, allRoomsInfo) => {
  allRoomsInfo[allRoomsInfo.length - 1].settings = [pass, numberOfPlayers, numberOfCards, isPrivate];
};

const isRoomFull = (roomIndex, allRoomsInfo) => {
  return allRoomsInfo[roomIndex].users.length === +allRoomsInfo[roomIndex].settings[1];
};

const findRoomIndex = (roomName, allRoomsInfo) => {
  return allRoomsInfo.indexOf(allRoomsInfo.filter(item => item.room === roomName)[0]);
};

const broadcastData = (allRoomsInfo, connectedUsers, io, socket) => {
  let roomsAvailable = allRoomsInfo.filter(item => !isRoomFull(findRoomIndex(item.room, allRoomsInfo), allRoomsInfo));

  socket.broadcast.to('Lobby').emit('displayPlayers', connectedUsers);

  socket.broadcast.to('Lobby').emit('displayRooms', roomsAvailable);
};

const leavePrevRoom = (socket, room, allRoomsInfo, connectedUsers) => {
  let targetRoom = allRoomsInfo.filter(item => item.room === room)[0];

  let users = targetRoom.users;

  let index = users.indexOf(connectedUsers[socket.id].name);

  users.splice(index, 1);
};

module.exports = {
  isNickUsed,
  isRoomCreated,
  addUser,
  removeUser,
  joinRoom,
  updatePlayRoom,
  setSettings,
  isRoomFull,
  findRoomIndex,
  broadcastData,
  leavePrevRoom,
};
