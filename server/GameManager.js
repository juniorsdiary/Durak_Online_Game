const deck = require('./cards.js');

function sortCards(arr) {
  return arr.sort((a, b) => {
    if (+a[3] > +b[3]) {
      return 1;
    }
    if (+a[3] < +b[3]) {
      return -1;
    }
    return 0;
  });
}

class GameField {
  constructor() {
    this.offenceCards = [];
    this.defenceCards = [];
    this.cards = [];
    this.curCard = [];
    this.curPlaceIndex = 0;
  }
  clearField() {
    this.offenceCards = Array(6);
    this.defenceCards = [];
    this.cards = [];
  }
  initField() {
    this.offenceCards = Array(6);
    this.defenceCards = [];
  }
}

class PlayersManager {
  defineSmallestTrump(trumpSuit) {
    this.trumps = this.cards.filter(item => item[0] === trumpSuit);
    this.cheapTrump = sortCards(this.trumps)[0];
  }
  resetUser() {
    this.active = false;
    this.cards = [];
    this.defenceOrOffence = '';
    this.turn = false;
  }
}

class Player extends PlayersManager {
  constructor(nickname, id) {
    super();
    this.nickname = nickname;
    this.id = id;
    this.cards = [];
    this.trumps = [];
    this.cheapTrump = [];
    this.turn = false;
    this.defenceOrOffence = '';
    this.curCard = [];
    this.playerIndex = 0;
    this.active = false;
    this.cardsToTake = 0;
    this.cardsNumber = 0;
  }
}

class PlayRoomManager {
  constructor() {
    this.initialDeck = deck;
  }
  setUsers() {
    this.users = [...Array(this.playersNumber).keys()].map(() => ({ name: null, active: false }));
  }
  addUser(name, id) {
    this.players.push(new Player(name, id));
    const index = this.players.findIndex(item => item.nickname === name);
    this.users[index].name = name;
  }
  activateUser(name) {
    this.players.find(item => item.nickname === name).active = true;
    this.users.find(item => item.name === name).active = true;
  }
  isFull() {
    this.fullState = this.users.every(item => item.name);
  }
  checkUsersReady() {
    this.usersReady = this.players.every(item => item.active);
  }
  isEmpty() {
    this.emptyState = this.users.every(item => !item.name);
  }
  getUser(nickname) {
    return this.players.find(item => item.nickname === nickname);
  }
  chooseDeckSize() {
    if (this.cardsNumber !== 52) {
      this.gameDeck = this.initialDeck.filter(item => item[3] > 5);
      this.shuffleDeck();
    } else {
      this.gameDeck = this.initialDeck;
      this.shuffleDeck();
    }
  }
  chooseTrump() {
    let random = Math.floor(Math.random() * (this.shuffledDeck.length - 1 + 1));
    this.trumpData = this.shuffledDeck.splice(random, 1)[0];
    this.trumpDataSecondary = this.trumpData;
  }
  shuffleDeck() {
    [...Array(this.cardsNumber).keys()].forEach((_, i) => {
      let randomNumber = Math.floor(Math.random() * (this.gameDeck.length - 1 + 1));
      this.shuffledDeck[i] = this.gameDeck[randomNumber];
      this.gameDeck.splice(randomNumber, 1);
    });
  }
  dealCards() {
    this.initialDeal = 6 * this.playersNumber;
    [...Array(this.initialDeal).keys()].forEach(item => {
      if (this.curPlayerIndex <= this.playersNumber - 1) {
        this.giveCard();
      } else {
        this.curPlayerIndex = 0;
        this.giveCard();
      }
    });
    this.gameField = new GameField();
    this.gameField.initField();
    this.gameInProgress = true;

    if (!this.lastPlayer) {
      this.defineFirstMove();
    } else {
      let loserIndex = this.players.indexOf(this.lastPlayer[0]);
      this.curPlayerIndex = loserIndex === 0 ? this.playersNumber - 1 : loserIndex - 1;
      this.curPlayer = this.players[this.curPlayerIndex];
      this.defender = this.lastPlayer[0];
      this.defineMove(true, false, 'offence', 'defence');
    }
  }
  giveCard() {
    this.takeLastCard();
    this.players[this.curPlayerIndex].cards.push(this.curCard);
    this.curPlayerIndex++;
  }
  takeLastCard() {
    if (this.shuffledDeck.length) {
      this.curCard = this.shuffledDeck.splice(-1, 1)[0];
    } else if (this.trumpData) {
      this.curCard = this.trumpData;
      this.trumpData = null;
    } else {
      this.curCard = null;
    }
  }
  defineFirstMove() {
    let cheapestTrump = ['', '', '', 14];
    this.players.forEach((item, index) => {
      item.defineSmallestTrump(this.trumpData[0]);
      if (item.cheapTrump) {
        if (item.cheapTrump[0] === this.trumpData[0] && item.cheapTrump[3] < cheapestTrump[3]) {
          cheapestTrump = item.cheapTrump;
          this.curPlayerIndex = index;
        }
      }
    });
    this.curPlayer = this.players[this.curPlayerIndex];
    this.defender = this.getPlayer(this.curPlayerIndex);
    this.defineMove(true, false, 'offence', 'defence');
    this.logNextTurn();
  }
  getPlayer(num) {
    if (num >= this.playersNumber - 1) {
      if (this.players[0].active) {
        return this.players[0];
      } else {
        return this.getPlayer(0);
      }
    } else {
      if (this.players[num + 1].active) {
        return this.players[num + 1];
      } else {
        return this.getPlayer(num + 1);
      }
    }
  }
  defineMove(bool1, bool2, value1, value2) {
    this.curPlayer.turn = bool1;
    this.curPlayer.defenceOrOffence = value1;
    this.defender.turn = bool2;
    this.defender.defenceOrOffence = value2;
  }
  logNextTurn() {
    if (this.taken) {
      this.logMessages.unshift({ nickName: this.curPlayer.nickname, messageIndex: 9 });
    } else {
      this.logMessages.unshift({ nickName: this.curPlayer.nickname, messageIndex: 0 });
    }
  }
  makeOffenceMove(placeIndex) {
    if (this.checkConditions()) {
      if (this.gameField.cards.length === 0) this.defender.cardsNumber = this.defender.cards.length;
      if (!this.interPhase) {
        this.transferOffenceCards(placeIndex);
        this.defineMove(false, true, 'offence', 'defence');
      } else {
        if (this.defender.cardsToTake !== 0) {
          this.transferOffenceCards();
          this.defender.cardsToTake--;
        }
      }

      if (this.curPlayer.cards.length === 0) {
        if (this.shuffledDeck.length === 0 && this.trumpData === null) {
          this.curPlayer.active = false;
          this.playerHasLeft = true;
          this.lastPlayer = this.players.filter(item => item.active === true);
          if (this.lastPlayer.length === 1) {
            this.isEndGame();
          }
        }
      }
    }
  }
  checkConditions() {
    return this.gameField.cards.length === 0 || this.gameField.cards.some(item => this.curPlayer.curCard[3] === item[3]);
  }
  transferOffenceCards() {
    let card = this.curPlayer.curCard;
    let playerCards = this.curPlayer.cards;
    let cardIndex;
    playerCards.forEach((item, index) => {
      if (item[0] === card[0] && +item[3] === +card[3]) {
        cardIndex = index;
      }
    });
    this.gameField.offenceCards[this.placeIndex] = card;
    this.gameField.cards.push(card);
    playerCards.splice(cardIndex, 1);
  }
  isEndGame() {
    this.endGame = { state: true, nickName: this.defender.nickname, msgIndex: 9 };
    this.lastPlayer[0].turn = false;
  }
  resetSettings() {
    this.players.forEach(item => item.resetUser());
    this.users = this.users.map(item => ({ ...item, active: false }));
    this.usersReady = false;
    this.discardPile = [];
    this.shuffledDeck = [];
    this.trumpData = [];
    this.gameInProgress = false;
    this.playerHasLeft = false;
    this.endGame = { state: false, nickName: '', msgIndex: '' };
    this.logMessages = [];
    this.gameField = {};

    this.chooseDeckSize();
    this.chooseTrump();
  }
  makeDefenceMove() {
    if (this.checkDefCard()) {
      this.transferDefenceCards();
      if (this.defender.cards.length === 0) {
        if (this.shuffledDeck.length === 0 && this.trumpData === null) {
          this.defender.active = false;
          this.lastPlayer = this.players.filter(item => item.active === true);
          if (this.lastPlayer.length === 1) {
            this.isEndGame();
          } else if (this.defender.active) {
            this.takeCards(false);
          }
        }
      }
      if (this.playerHasLeft) {
        this.takeCards(false);
      } else {
        this.defineMove(true, false, 'offence', 'defence');
      }
    }
  }
  checkDefCard() {
    let card = this.defender.curCard;
    let gameFieldCards = this.gameField.offenceCards;
    let cardSuit = card[0];
    let gameFieldSuit = gameFieldCards[this.placeIndex][0];
    let cardValue = +card[3];
    let gameFieldValue = +gameFieldCards[this.placeIndex][3];
    if (gameFieldSuit === this.trumpDataSecondary[0]) {
      return cardValue > gameFieldValue && cardSuit === this.trumpDataSecondary[0];
    } else if (cardSuit === gameFieldSuit && cardSuit !== this.trumpDataSecondary[0]) {
      return cardValue > gameFieldValue;
    } else {
      return cardSuit === this.trumpDataSecondary[0];
    }
  }
  transferDefenceCards() {
    let card = this.defender.curCard;
    let playerCards = this.defender.cards;
    let cardIndex;
    playerCards.forEach((item, index) => {
      if (item[0] === card[0] && +item[3] === +card[3]) {
        cardIndex = index;
      }
    });
    this.gameField.defenceCards.push(card);
    this.gameField.cards.push(card);
    playerCards.splice(cardIndex, 1);
  }
  takeCards() {
    this.interPhase = false;
    this.playerHasLeft = false;
    this.curPlayer.turn = false;
    let cardsDiff = 6 - this.curPlayer.cards.length;
    if (this.taken) {
      this.gameField.cards.forEach(item => this.defender.cards.push(item));
      this.nextDealForCurPlayer(cardsDiff);
    } else {
      this.gameField.cards.forEach(item => this.discardPile.push(item));
      this.nextDealForCurPlayer(cardsDiff);
    }
    this.gameField.clearField();
  }
  nextDealForCurPlayer(num) {
    if (num > 0) {
      this.takeLastCard();
      if (this.curCard) {
        this.curPlayer.cards.push(this.curCard);
        num--;
        this.nextDealForCurPlayer(num);
      } else {
        this.nextDealForDefender(6 - this.defender.cards.length);
      }
    } else {
      this.nextDealForDefender(6 - this.defender.cards.length);
    }
  }
  nextDealForDefender(num) {
    if (num > 0) {
      this.takeLastCard();
      if (this.curCard) {
        this.defender.cards.push(this.curCard);
        num--;
        this.nextDealForDefender(num);
      } else {
        this.anotherStep();
      }
    } else {
      this.anotherStep();
    }
  }
  anotherStep() {
    if (this.taken) {
      this.taken = false;
      this.takeScenario();
    } else {
      this.discardScenario();
    }
  }
  takeScenario() {
    this.curPlayerIndex = this.players.indexOf(this.defender);
    this.curPlayer = this.getPlayer(this.curPlayerIndex);
    this.curPlayerIndex = this.players.indexOf(this.curPlayer);
    this.defender = this.getPlayer(this.curPlayerIndex);
    this.defineMove(true, false, 'offence', 'defence');
    this.logNextTurn();
  }
  discardScenario() {
    this.logNextMessages();
    this.curPlayer = this.getPlayer(this.curPlayerIndex);
    this.curPlayerIndex = this.players.indexOf(this.curPlayer);
    this.defender = this.getPlayer(this.curPlayerIndex);
    this.defineMove(true, false, 'offence', 'defence');
    this.logNextTurn();
  }
  logNextMessages() {
    const nickname = this.defender.nickname;
    const messageIndex = this.taken ? 1 : 2;
    this.logMessages.unshift({ nickname, messageIndex });
  }
  countCardsToTake() {
    this.defender.cardsToTake = this.defender.cardsNumber - this.gameField.offenceCards.length;
  }
}

class PlayRoom extends PlayRoomManager {
  constructor(players, cards, room) {
    super();
    this.playersNumber = players;
    this.cardsNumber = cards;
    this.room = room;
    this.users = [];
    this.players = [];
    this.fullState = false;
    this.usersReady = false;
    this.gameDeck = [];
    this.shuffledDeck = [];
    this.initialDeal = 0;
    this.gameField = {};
    this.gameInProgress = false;
    this.lastPlayer = undefined;
    this.curPlayerIndex = 0;
    this.curPlayer = {};
    this.defender = {};
    this.trumpData = [];
    this.logMessages = [];
    this.taken = false;
    this.interPhase = false;
    this.playerHasLeft = false;
    this.curCard = [];
    this.discardPile = [];
    this.endGame = { state: false, nickName: '', msgIndex: '' };

    this.chooseDeckSize();
    this.chooseTrump();
    this.setUsers();
  }
}

const GameManager = (() => {
  const gameRooms = {};
  return {
    getPlayRoom: function(room) {
      return gameRooms[room];
    },
    createGameRoom: function(players, cards, room) {
      const NewRoom = new PlayRoom(players, cards, room);
      gameRooms[room] = NewRoom;
    },
    deletePlayer({ user, room }) {
      gameRooms[room].players = gameRooms[room].players.filter(item => item.nickname !== user);
      gameRooms[room].users = gameRooms[room].users.map(item => (item.name === user ? { name: null, active: false } : item));
    },
    deleteRoom(room) {
      delete gameRooms[room];
    },
  };
})();

module.exports = GameManager;
