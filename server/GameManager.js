let cards = require('./cards.js');

let shuffle = function(arr) {
  let newArr = [];
  while (arr.length > 0) {
    let number = getRandomElem(arr);
    newArr.push(number);
    arr.splice(arr.indexOf(number), 1);
  }
  return newArr;
};
let getRandomElem = function(arr) {
  let randomNum = Math.floor(Math.random() * arr.length);
  return arr[randomNum];
};

class Game {
  constructor(numberOfPlayers, numberOfCards, roomName) {
    this.roomName = roomName;
    this.numberOfPlayers = +numberOfPlayers;
    this.numberOfCards = numberOfCards;
    this.initialDeck = cards;
    this.generalOrderDeck = [];
    this.shortDeck = [];
    this.shuffledDeck = [];
    this.initialDeal = 0;
    this.trumpData = [];
    this.trumpForRender = [];
    this.players = [];
    this.users = [];
    this.usersReady = [];
    this.number = 0;
    this.index = 0;
    this.curPlayerIndex = 0;
    this.curPlayer = {};
    this.curCard = [];
    this.defender = {};
    this.logMessages = [];
    this.initialPlayerIndex = 0;
    this.taken = false;
    this.gameField = {};
    this.discardPile = [];
    this.playerHasLeft = false;
    this.endGame = false;
    this.endGameMsg = '';
    this.lastPlayer = null;
    this.gameInProgress = false;

    this.shuffleDeck();
    this.chooseTrump();
  }

  shuffleDeck() {
    for (let elem in this.initialDeck) {
      for (let item in this.initialDeck[elem]) {
        this.generalOrderDeck.push([
          elem,
          this.initialDeck[elem][item][0],
          this.initialDeck[elem][item][1],
          this.initialDeck[elem][item][2],
        ]);
      }
    }

    if (this.numberOfCards !== '52') {
      this.shortDeck = this.generalOrderDeck.filter(item => item[3] > 5);
      this.shuffledDeck = shuffle(this.shortDeck);
    } else {
      this.shuffledDeck = shuffle(this.generalOrderDeck);
    }
  }

  chooseTrump() {
    let random = Math.floor(Math.random() * (this.shuffledDeck.length - 1 + 1));

    this.trumpData = this.shuffledDeck.splice(random, 1)[0];

    this.trumpForRender = this.trumpData;
  }

  dealCards() {
    this.initialDeal = 6 * this.numberOfPlayers;

    for (let i = this.initialDeal; i > 0; i--) {
      if (this.curPlayerIndex <= this.numberOfPlayers - 1) {
        this.giveCard();
      } else {
        this.curPlayerIndex = 0;
        this.giveCard();
      }
    }

    this.gameField = new GameField();

    this.gameInProgress = true;
    if (!this.lastPlayer) {
      this.defineFirstMove();
    } else {
      this.curPlayerIndex = this.players.indexOf(this.lastPlayer[0]) - 1;

      this.curPlayer = this.players[this.curPlayerIndex];

      this.curPlayerIndex = this.players.indexOf(this.curPlayer);

      this.defender = this.lastPlayer[0];

      this.defineMove(true, false, 'offence', 'defence');
    }
  }

  giveCard() {
    this.takeLastCard();

    this.curPlayer = this.players[this.curPlayerIndex];

    this.curPlayer.cards.push(this.curCard);

    this.curPlayerIndex++;
  }

  takeLastCard() {
    if (this.shuffledDeck.length) {
      this.curCard = this.shuffledDeck.splice(-1, 1)[0];
    } else if (this.trumpData) {
      this.curCard = this.trumpData;
      this.trumpData = null;
    } else {
      this.curCard = 'end of deck';
    }
  }

  defineFirstMove() {
    let num = 0;
    let trumps = [];

    while (num <= this.numberOfPlayers - 1) {
      let player = this.players[num];

      trumps.push(player.defineSmallestTrump(this));

      num++;
    }

    if (trumps.length) {
      let copyArr = [...trumps];

      this.curPlayerIndex = copyArr.indexOf(this.sortCards(trumps)[0]);
    } else {
      this.curPlayerIndex = Math.floor(Math.random() * (this.players.length - 1 + 1));
    }

    this.curPlayer = this.players[this.curPlayerIndex];

    this.curPlayerIndex = this.players.indexOf(this.curPlayer);

    this.defender = this.getPlayer(this.curPlayerIndex);

    this.defineMove(true, false, 'offence', 'defence');

    this.gameField = new GameField();

    this.logNextTurn();
  }

  sortCards(arr) {
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

  logNextTurn() {
    let msg = { nickName: this.curPlayer.nickname, msgIndex: 0 };

    this.logMessages.unshift(msg);
  }

  logNextMessages() {
    let msg;

    if (this.taken) {
      msg = { nickName: this.defender.nickname, msgIndex: 1 };
    } else {
      msg = { nickName: this.defender.nickname, msgIndex: 2 };
    }

    this.logMessages.unshift(msg);
  }

  checkConditions() {
    if (this.gameField.cards.length === 0) {
      return true;
    } else {
      return this.gameField.cards.some(item => +this.curPlayer.curCard[3] === +item[3]);
    }
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

    this.gameField.offenceCards.push(card);
    this.gameField.cards.push(card);

    playerCards.splice(cardIndex, 1);
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

  makeOffenceMove() {
    if (this.checkConditions()) {
      if (this.gameField.cards.length === 0) this.defender.cardsNumber = this.defender.cards.length;

      if (!this.interPhase) {
        this.transferOffenceCards();

        this.defineMove(false, true, '', 'defence');
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
            this.curPlayer.takeCards(false);
          }
        }
      }

      if (this.playerHasLeft) {
        this.defender.takeCards(false);
      } else {
        this.defineMove(true, false, 'offence', '');
      }
    }
  }

  checkDefCard() {
    let card = this.defender.curCard;

    let gameFieldCards = this.gameField.offenceCards;

    let length = gameFieldCards.length;

    let cardSuit = card[0];

    let gameFieldSuit = gameFieldCards[length - 1][0];

    let cardValue = +card[3];

    let gameFieldValue = +gameFieldCards[length - 1][3];

    if (gameFieldSuit === this.trumpForRender[0]) {
      return cardValue > gameFieldValue && cardSuit === this.trumpForRender[0];
    } else if (cardSuit === gameFieldSuit) {
      return cardValue > gameFieldValue;
    } else {
      return cardSuit === this.trumpForRender[0] && gameFieldValue !== card[3];
    }
  }

  nextDealForCurPlayer(num) {
    if (num > 0) {
      this.takeLastCard();

      if (this.curCard !== 'end of deck') {
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

      if (this.curCard !== 'end of deck') {
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
      this.takeScenario();

      this.taken = false;
    } else {
      this.discardScenario();
    }
  }

  takeScenario() {
    this.logNextMessages();

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

  getPlayer(num) {
    if (num >= this.numberOfPlayers - 1) {
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

  isEndGame() {
    this.endGame = true;

    this.endGameMsg = { nickName: this.defender.nickname, msgIndex: 9 };

    this.lastPlayer[0].turn = false;
  }

  countCardsToTake(index) {
    this.defender.cardsToTake = this.defender.cardsNumber - this.gameField.offenceCards.length;
  }

  activateUser(index) {
    this.players[index].active = true;

    this.usersReady[index] = true;
  }

  resetSettings() {
    this.players.forEach(item => item.resetUser());
    this.usersReady = this.usersReady.map(item => !item);
    this.discardPile = [];
    this.generalOrderDeck = [];
    this.shortDeck = [];
    this.shuffledDeck = [];
    this.trumpData = undefined;
    this.gameInProgress = false;
    this.playerHasLeft = false;
    this.endGameMsg = '';
    this.endGame = false;
    this.logMessages = [];
    this.gameField = {};
    this.shuffleDeck();
    this.chooseTrump();
  }
}

class Player {
  constructor(id, nickname, roomName, systMessages) {
    this.id = id;
    this.cards = [];
    this.nickname = nickname;
    this.roomName = roomName;
    this.systMessages = systMessages;
    this.trumps = [];
    this.cheapTrump = [];
    this.turn = false;
    this.defenceOrOffence = '';
    this.curCard = [];
    this.position = 0;
    this.active = false;
    this.cardsToTake = 0;
    this.cardsNumber = 0;
  }

  defineSmallestTrump(game) {
    this.trumps = this.cards.filter(item => item[0] === game.trumpData[0]);

    this.cheapTrump = game.sortCards(this.trumps)[0];

    return this.cheapTrump;
  }

  takeCards(value) {
    let playRoom = gameManager.getPlayRoom(this.roomName);

    playRoom.interPhase = false;
    playRoom.taken = value;
    playRoom.playerHasLeft = false;
    this.turn = false;

    let cardsDiff = 6 - playRoom.curPlayer.cards.length;

    if (value) {
      playRoom.gameField.cards.forEach(item => this.cards.push(item));
      playRoom.nextDealForCurPlayer(cardsDiff);
    } else {
      playRoom.gameField.cards.forEach(item => playRoom.discardPile.push(item));

      playRoom.nextDealForCurPlayer(cardsDiff);
    }

    playRoom.gameField.offenceCards = [];
    playRoom.gameField.defenceCards = [];
    playRoom.gameField.cards = [];
  }

  resetUser() {
    this.active = false;
    this.cards = [];
    this.defenceOrOffence = '';
    this.turn = false;
  }
}

class GameField {
  constructor() {
    this.offenceCards = [];
    this.defenceCards = [];
    this.cards = [];
    this.curCard = [];
    this.curPlaceIndex = 0;
  }
}

class GameManager {
  constructor() {
    this.gameRooms = {};
  }

  initializeData(numberOfPlayers, numberOfCards, roomName, nickname, id) {
    this.gameRooms[roomName] = new Game(numberOfPlayers, numberOfCards, roomName);

    this.addUser(roomName, nickname, id);
  }

  addUser(roomName, nickname, id) {
    let room = this.getPlayRoom(roomName);

    room.users.push(nickname);

    room.usersReady.push(false);

    room.players.push(new Player(id, nickname, roomName));
  }

  getPlayRoom(roomName) {
    return this.gameRooms[roomName];
  }

  deletePlayerFromRoom(room, index) {
    this.gameRooms[room].players.splice(index, 1);
    this.gameRooms[room].users.splice(index, 1);
    this.gameRooms[room].usersReady.splice(index, 1);
  }
  findIndex(room, nickname) {
    let player = this.gameRooms[room].players.find(item => item.nickname === nickname);
    return this.gameRooms[room].players.indexOf(player);
  }
}

let gameManager = new GameManager();

module.exports = gameManager;
