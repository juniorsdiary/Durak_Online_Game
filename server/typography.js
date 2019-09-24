let russian = {
  inGameMessages: [
    'ходит',
    'взял карты',
    'отбил карты',
    'Сейчас не ваша очередь',
    'Взять',
    'Бито',
    'Ждем других игроков',
    'Готовы?',
    'проиграл',
    'может подкидывать',
  ],
  logInPage: ['Придумай псевдоним', 'Крутой псевдоним', 'Войти в лобби'],
  lobbyPage: [
    'Выйти',
    'Игроков в сети:',
    'Общий чат',
    'Отправить',
    'Сообщение в общий чат',
    'Доступные комнаты',
    'Создать комнату',
    'Настройки игровой комнаты',
    'название комнаты',
    'Количество игроков',
    'Количество карт',
    'Доступ',
    'Закрытая',
    'Открытая',
    'установите пароль',
    'Создать',
    'Название комнаты',
    'Кол-во карт',
    'Кол-во игроков',
    'Присоединится',
    'Введите пароль',
  ],
  errors: [],
};

let english = {
  inGameMessages: [
    'turn',
    'took cards',
    'discarded cards',
    'It is not your turn now',
    'Take',
    'Discard',
    'Waiting for other players',
    'Ready?',
    'lost',
    'can shed cards',
  ],
  logInPage: ['Create a Nick Name', 'Awesome nickname', 'Join Lobby'],
  lobbyPage: [
    'Sign out',
    'Players currently online: ',
    'Global Chat',
    'Send',
    'Message to the chat',
    'Available Rooms',
    'Create Room',
    'Choose Room Settings',
    'room name',
    'Players',
    'Cards',
    'Access',
    'Private',
    'Public',
    'set password',
    'Create',
    'Room name',
    'Number of Cards',
    'Players',
    'Join',
    'Have a password?',
  ],
  errors: [
    '',
    'Nickname can not be empty',
    'Nickname can not contain white spaces in the beginning',
    'This nickname already in use',
    'Room name can not be empty',
    'Room name can not contain white spaces in the beginning',
    'This room name is already in use',
    'Invalid Password',
  ],
};

module.exports = { russian, english };
