class DataHandler {
  constructor() {
    this.nicknamesUsed = [];
    this.connectedUsers = [];
    this.allRoomsInfo = [];
    this.currRoom = {};
    this.roomsNamesUsed = [];
    this.messages = [];
  }
  checkNicknames(nickname) {
    return this.nicknamesUsed.includes(nickname);
  }
  joinRoom(socket, roomName, nickname) {
    socket.join(roomName);
    this.currRoom[nickname] = roomName;
    if (!this.roomsNamesUsed.includes(roomName)) {
      this.roomsNamesUsed.push(roomName);
      this.allRoomsInfo.push({ room: roomName, users: [], settings: '' });
    }
  }
  addUser(nickname, socket) {
    this.nicknamesUsed.push(nickname);

    this.connectedUsers.push({ id: socket.id, name: nickname, connectTime: new Date() });
  }
  updatePlayRoom(roomName, nickname, socket) {
    this.allRoomsInfo.filter(item => item.room === roomName)[0].users.push(nickname);
    this.connectedUsers.find(item => item.name === nickname).room = roomName;
  }
  getAvalableRooms() {
    return this.allRoomsInfo.filter(item => !this.isRoomFull(this.findRoomIndex(item.room)));
  }
  isRoomFull(roomIndex) {
    const targetRoom = this.allRoomsInfo[roomIndex];
    return targetRoom.users.length === +targetRoom.settings[1];
  }
  findRoomIndex(roomName) {
    return this.allRoomsInfo.indexOf(this.allRoomsInfo.filter(item => item.room === roomName)[0]);
  }
}

// const removeUser = (connectedUsers, socket, nicknamesUsed, allRoomsInfo, currRoom, room) => {
//   let targetRoom = allRoomsInfo.filter(item => item.room === room)[0];
//
//   if (targetRoom) {
//     targetRoom.users.splice(targetRoom.users.indexOf(connectedUsers[socket.id].name), 1);
//     nicknamesUsed.splice(nicknamesUsed.indexOf(connectedUsers[socket.id].name), 1);
//     delete currRoom[connectedUsers[socket.id].name];
//     socket.leave(connectedUsers[socket.id].room);
//     delete connectedUsers[socket.id];
//   }
// };
//
// const setSettings = (roomName, pass, isPrivate, numberOfPlayers, numberOfCards, allRoomsInfo) => {
//   allRoomsInfo[allRoomsInfo.length - 1].settings = [pass, numberOfPlayers, numberOfCards, isPrivate];
// };
//
// const broadcastData = (allRoomsInfo, connectedUsers, io, socket) => {
//   let roomsAvailable = allRoomsInfo.filter(item => !isRoomFull(findRoomIndex(item.room, allRoomsInfo), allRoomsInfo));
//
//   socket.broadcast.to('Lobby').emit('displayPlayers', connectedUsers);
//
//   socket.broadcast.to('Lobby').emit('displayRooms', roomsAvailable);
// };
//
// const leavePrevRoom = (socket, room, allRoomsInfo, connectedUsers) => {
//   let targetRoom = allRoomsInfo.filter(item => item.room === room)[0];
//
//   let users = targetRoom.users;
//
//   let index = users.indexOf(connectedUsers[socket.id].name);
//
//   users.splice(index, 1);
// };

module.exports = new DataHandler();
