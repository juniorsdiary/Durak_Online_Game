import * as types from '../types';

const initialState = {
  usersData: [],
  roomsData: [],
  userData: {},
  messages: [],
  errorData: {
    state: false,
    messageIndex: 0,
  },
  typography: {
    inGameMessages: [],
    logInPage: [],
    lobbyPage: [],
    errors: [],
  },
  settingsModal: false,
  passwordModal: false,
  accessRoom: '',
};

export default function commonData(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.SET_USERS_DATA:
      return { ...state, usersData: payload };
    case types.SET_ROOMS_DATA:
      return { ...state, roomsData: payload };
    case types.SET_ERROR:
      return { ...state, errorData: payload };
    case types.SET_USER_DATA:
      return { ...state, userData: payload };
    case types.ADD_MESSAGE:
      return { ...state, messages: [...state.messages, payload] };
    case types.CHANGE_LANGUAGE:
      return { ...state, typography: payload };
    case types.SET_PASSWORD_MODAL:
      return { ...state, passwordModal: payload };
    case types.SET_SETTINGS_MODAL:
      return { ...state, settingsModal: payload };
    case types.SET_ACCESS_ROOM:
      return { ...state, accessRoom: payload };
    default:
      return state;
  }
}
