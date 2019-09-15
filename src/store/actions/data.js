import * as types from '../types';

export function setUsersData(data) {
  return {
    type: types.SET_USERS_DATA,
    payload: data,
  };
}

export function setRoomsData(data) {
  return {
    type: types.SET_ROOMS_DATA,
    payload: data,
  };
}
