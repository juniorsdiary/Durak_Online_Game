// class Handler {
//   constructor() {
//     this.nicknamesUsed = [];
//     this.connectedUsers = [];
//     this.allRoomsInfo = [];
//     this.currRoom = {};
//     this.roomsNamesUsed = [];
//     this.messages = [];
//   }
//   checkNicknames(nickname) {
//     return this.nicknamesUsed.includes(nickname);
//   }
//   joinRoom(roomName, nickname) {
//     this.currRoom[nickname] = roomName;
//     if (!this.roomsNamesUsed.includes(roomName)) {
//       this.roomsNamesUsed.push(roomName);
//       this.allRoomsInfo.push({ room: roomName, users: [], settings: '' });
//     }
//   }
//   addUser(nickname, id) {
//     this.nicknamesUsed.push(nickname);
//     this.connectedUsers.push({ id, name: nickname, connectTime: new Date() });
//   }
//   updatePlayRoom(roomName, nickname) {
//     this.allRoomsInfo.find(item => item.room === roomName).users.push(nickname);
//     this.connectedUsers.find(item => item.name === nickname).room = roomName;
//   }
//   getAvailableRooms() {
//     return this.allRoomsInfo.filter(item => !this.isRoomFull(this.findRoomIndex(item.room)) && item.room !== 'Lobby');
//   }
//   isRoomFull(roomIndex) {
//     const targetRoom = this.allRoomsInfo[roomIndex];
//     return targetRoom.users.length === +targetRoom.settings.players;
//   }
//   findRoomIndex(roomName) {
//     return this.allRoomsInfo.indexOf(this.allRoomsInfo.find(item => item.room === roomName));
//   }
//   checkUserConnection(nickname) {
//     return !!this.connectedUsers.find(user => user.name === nickname);
//   }
//   getUserRoom(nickname) {
//     return this.currRoom[nickname];
//   }
//   removeUser(nickname, room) {
//     const targetRoom = this.allRoomsInfo.filter(item => item.room === room)[0];
//     if (targetRoom) {
//       const usersInRoom = targetRoom.users;
//       const userInRoomIndex = usersInRoom.indexOf(nickname);
//       const nicknameIndex = this.nicknamesUsed.indexOf(nickname);
//       const connectedUser = this.connectedUsers.find(item => item.name === nickname);
//       const connectedUsersIndex = this.connectedUsers.indexOf(connectedUser);
//       usersInRoom.splice(userInRoomIndex, 1);
//       this.nicknamesUsed.splice(nicknameIndex, 1);
//       this.connectedUsers.splice(connectedUsersIndex, 1);
//       delete this.currRoom[nickname];
//     }
//   }
//   addMessage(msg, nickname) {
//     this.messages = [...this.messages, { nickname: nickname, msg: msg, time: new Date() }];
//   }
//   leaveRoom(room, nickname) {
//     const targetRoom = this.allRoomsInfo.find(item => item.room === room);
//     const users = targetRoom.users;
//     const index = users.indexOf(nickname);
//     users.splice(index, 1);
//   }
//   setSettings(roomName, password, access, players, cards) {
//     this.allRoomsInfo.find(item => item.room === roomName).settings = { password, players, cards, access };
//   }
// }

class DataStorage {
  constructor() {
    this.users = [];
    this.rooms = [];
    this.messages = [];
  }
  checkNickname(user) {
    return this.users.some(item => item.user === user);
  }
  checkRooms(room) {
    return this.rooms.some(item => item.room === room);
  }
  addUser(user, id) {
    this.users.push({ id, user, connectTime: new Date(), room: '' });
  }
  addRoom(room, settings) {
    this.rooms.push({ room, users: [], settings });
  }
  updateRoom(room, user) {
    this.rooms.find(item => item.room === room).users.push(user);
  }
  updateUser(user, room) {
    this.users.find(item => item.user === user).room = room;
  }
  addMessage(message, nickname) {
    this.messages = [...this.messages, { nickname, message, time: new Date() }];
  }
}

const Storage = new DataStorage();

const DataHandler = (() => {
  const addFns = {
    message: function(message, nickname) {
      Storage.addMessage(message, nickname);
    },
    room: function(room, settings) {
      const used = Storage.checkRooms(room);
      if (used) {
        return { error: true, message: `Room name ${room} is used` };
      } else {
        Storage.addRoom(room, settings);
        return { error: false, message: '' };
      }
    },
    user: function(user, id) {
      const used = Storage.checkNickname(user);
      const tested = /^\s+/.test(user);
      if (!user) {
        return { error: true, message: `Nickname can not be empty` };
      } else if (tested) {
        return { error: true, message: `Nickname can not contain white spaces in the beginning` };
      } else if (used) {
        return { error: true, message: `Nickname ${user} is used` };
      } else {
        Storage.addUser(user, id);
        return { error: false, message: '' };
      }
    },
  };
  const updateFns = {
    room: function(room, user) {
      Storage.updateRoom(room, user);
    },
    user: function(user, room) {
      Storage.updateUser(user, room);
    },
  };
  const deleteFns = {
    message: function(message) {
      return `You deleted message: ${message}`;
    },
    room: function(room) {
      Storage.rooms = Storage.rooms.filter(item => item.room !== room);
    },
    user: function(user) {
      const userData = Storage.users.find(item => item.user === user);
      let roomData = Storage.rooms.find(item => item.room === userData.room);
      console.log('TCL: DataHandler -> roomData', roomData);
      roomData.users = roomData.users.filter(item => item !== user);
      Storage.users = Storage.users.filter(item => item.user !== user);
    },
  };
  const getFns = {
    messages: function() {
      return Storage.messages;
    },
    users: function(user) {
      if (user) {
        return Storage.users.find(item => item.user === user);
      } else {
        return Storage.users;
      }
    },
    rooms: function(room) {
      if (room) {
        return Storage.rooms.find(item => item.room === room);
      } else {
        return Storage.rooms.filter(item => item.room !== 'Lobby');
      }
    },
  };
  const addData = function(name, ...args) {
    return addFns[name](...args);
    // return addFns[name] && addFns[name].apply(addFns, [].slice.call(arguments, 1));
  };
  const deleteData = function(name, ...args) {
    return deleteFns[name](...args);
    // return deleteFns[name] && deleteFns[name].apply(deleteFns, [].slice.call(arguments, 1));
  };
  const updateData = function(name, ...args) {
    return updateFns[name](...args);
    // return updateFns[name] && updateFns[name].apply(updateFns, [].slice.call(arguments, 1));
  };
  const getData = function(name, ...args) {
    return getFns[name](...args);
    // return getFns[name] && getFns[name].apply(getFns, [].slice.call(arguments, 1));
  };
  return { addData, deleteData, updateData, getData };
})();

module.exports = DataHandler;
