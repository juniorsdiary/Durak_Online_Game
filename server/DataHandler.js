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
  joinRoom(roomName, nickname) {
    this.currRoom[nickname] = roomName;
    if (!this.roomsNamesUsed.includes(roomName)) {
      this.roomsNamesUsed.push(roomName);
      this.allRoomsInfo.push({ room: roomName, users: [], settings: '' });
    }
  }
  addUser(nickname, id) {
    this.nicknamesUsed.push(nickname);
    this.connectedUsers.push({ id, name: nickname, connectTime: new Date() });
  }
  updatePlayRoom(roomName, nickname) {
    this.allRoomsInfo.find(item => item.room === roomName).users.push(nickname);
    this.connectedUsers.find(item => item.name === nickname).room = roomName;
  }
  getAvalableRooms() {
    return this.allRoomsInfo.filter(item => !this.isRoomFull(this.findRoomIndex(item.room)) && item.room !== 'Lobby');
  }
  isRoomFull(roomIndex) {
    const targetRoom = this.allRoomsInfo[roomIndex];
    return targetRoom.users.length === +targetRoom.settings.players;
  }
  findRoomIndex(roomName) {
    return this.allRoomsInfo.indexOf(this.allRoomsInfo.find(item => item.room === roomName));
  }
  checkUserConnection(nickname) {
    return !!this.connectedUsers.find(user => user.name === nickname);
  }
  getUserRoom(nickname) {
    return this.currRoom[nickname];
  }
  removeUser(nickname, room) {
    const targetRoom = this.allRoomsInfo.filter(item => item.room === room)[0];
    if (targetRoom) {
      const usersInRoom = targetRoom.users;
      const userInRoomIndex = usersInRoom.indexOf(nickname);
      const nicknameIndex = this.nicknamesUsed.indexOf(nickname);
      const connectedUser = this.connectedUsers.find(item => item.name === nickname);
      const connectedUsersIndex = this.connectedUsers.indexOf(connectedUser);
      usersInRoom.splice(userInRoomIndex, 1);
      this.nicknamesUsed.splice(nicknameIndex, 1);
      this.connectedUsers.splice(connectedUsersIndex, 1);
      delete this.currRoom[nickname];
    }
  }
  addMessage(msg, nickname) {
    this.messages = [...this.messages, { nickname: nickname, msg: msg, time: new Date() }];
  }
  leaveRoom(room, nickname) {
    const targetRoom = this.allRoomsInfo.find(item => item.room === room);
    const users = targetRoom.users;
    const index = users.indexOf(nickname);
    users.splice(index, 1);
  }
  setSettings(roomname, password, access, players, cards) {
    this.allRoomsInfo.find(item => item.room === roomname).settings = { password, players, cards, access };
  }
}

module.exports = new DataHandler();
