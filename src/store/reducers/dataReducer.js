import * as types from '../types';
const initialState = {
  usersData: [],
  roomsData: [],
  userData: {},
  messages: [],
  typography: {
    inGameMessages: [],
    logInPage: [],
    lobbyPage: [],
    warning: '',
  },
};
export default function commonData(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.SET_USERS_DATA:
      return { ...state, usersData: payload };
    case types.SET_ROOMS_DATA:
      return { ...state, roomsData: payload };
    case types.SET_USER_DATA:
      return {
        ...state,
        userData: payload,
      };
    case types.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload],
      };
    case types.CHANGE_LANGUAGE:
      return {
        ...state,
        typography: payload,
      };
    default:
      return state;
  }
}
