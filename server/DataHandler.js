class DataStorage {
  constructor() {
    this.users = [];
    this.rooms = [];
    this.messages = [];
  }
  checkNickname(nickname) {
    return this.users.some(item => item.nickname === nickname);
  }
  checkRooms(room) {
    return this.rooms.some(item => item.room === room);
  }
  addUser(nickname, id) {
    this.users.push({ id, nickname, connectTime: new Date(), room: '' });
  }
  addRoom(room, settings) {
    this.rooms.push({ room, users: [], settings });
  }
  updateRoom(room, nickname) {
    this.rooms.find(item => item.room === room).users.push(nickname);
  }
  updateUser(nickname, room) {
    this.users.find(item => item.nickname === nickname).room = room;
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
      const tested = /^\s+/.test(room);
      if (!room) {
        return { error: true, messageIndex: 4 };
      } else if (tested) {
        return { error: true, messageIndex: 5 };
      } else if (used) {
        return { error: true, messageIndex: 6 };
      } else {
        Storage.addRoom(room, settings);
        return { error: false, messageIndex: 0 };
      }
    },
    user: function(nickname, id) {
      const used = Storage.checkNickname(nickname);
      const tested = /^\s+/.test(nickname);
      if (!nickname) {
        return { error: true, messageIndex: 1 };
      } else if (tested) {
        return { error: true, messageIndex: 2 };
      } else if (used) {
        return { error: true, messageIndex: 3 };
      } else {
        Storage.addUser(nickname, id);
        return { error: false, messageIndex: 0 };
      }
    },
  };
  const updateFns = {
    room: function(room, nickname) {
      Storage.updateRoom(room, nickname);
    },
    user: function(nickname, room) {
      Storage.updateUser(nickname, room);
    },
  };
  const deleteFns = {
    message: function(message) {
      return `You deleted message: ${message}`;
    },
    room: function(room) {
      Storage.rooms = Storage.rooms.filter(item => item.room !== room);
    },
    user: function(nickname) {
      const userData = Storage.users.find(item => item.nickname === nickname);
      let roomData = Storage.rooms.find(item => item.room === userData.room);
      roomData.users = roomData.users.filter(item => item !== nickname);
      Storage.users = Storage.users.filter(item => item.nickname !== nickname);
    },
  };
  const getFns = {
    messages: function() {
      return Storage.messages;
    },
    users: function(nickname) {
      if (nickname) {
        return Storage.users.find(item => item.nickname === nickname);
      } else {
        return Storage.users;
      }
    },
    rooms: function(room) {
      if (room) {
        return Storage.rooms.find(item => item.room === room);
      } else {
        return Storage.rooms.filter(item => item.room !== 'Lobby' && item.users.length !== +item.settings.players);
      }
    },
  };
  const addData = function(name, ...args) {
    return addFns[name](...args);
  };
  const deleteData = function(name, ...args) {
    return deleteFns[name](...args);
  };
  const updateData = function(name, ...args) {
    return updateFns[name](...args);
  };
  const getData = function(name, ...args) {
    return getFns[name](...args);
  };
  return { addData, deleteData, updateData, getData };
})();

module.exports = DataHandler;
