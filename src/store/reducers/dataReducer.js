import * as types from '../types';
const initialState = {
  usersData: [],
  roomsData: [],
  userData: {},
  messages: [],
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
    case types.SET_MESSAGES:
      return {
        ...state,
        messages: payload,
      };
    default:
      return state;
  }
}
