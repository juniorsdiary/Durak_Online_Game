import * as types from '../types';

export default function usersData(state = [], action) {
  const { type, payload } = action;
  if (type === types.SET_USERS_DATA) {
    return payload;
  }
  return state;
}
