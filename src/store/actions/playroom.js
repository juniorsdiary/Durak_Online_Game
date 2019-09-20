import * as types from '../types';

export function setPlayRoomData(data) {
  return { type: types.SET_PLAY_ROOM_DATA, payload: data };
}

export function setClientIndex(index) {
  return { type: types.SET_CLIENT_INDEX, payload: index };
}

export function assignPlayersInfo(number, index) {
  return { type: types.ASSIGN_PLAYERS_INFO, payload: [number, index] };
}

export function setControlsState(data) {
  return {
    type: types.SET_CONTROLS,
    payload: data,
  };
}

export function definePlayersMove(curPlayer, defender, id) {
  let value = {};
  if (curPlayer.id === id && curPlayer.turn) {
    value = {
      activeTake: false,
      activeDiscard: true,
      turn: true,
      defenceOrOffence: curPlayer.defenceOrOffence,
    };
  } else if (curPlayer.id === id && !curPlayer.turn) {
    value = {
      activeTake: false,
      activeDiscard: false,
      turn: false,
      defenceOrOffence: curPlayer.defenceOrOffence,
    };
  } else if (defender.id === id && defender.turn) {
    value = {
      activeTake: true,
      activeDiscard: false,
      turn: true,
      defenceOrOffence: defender.defenceOrOffence,
    };
  } else if (defender.id === id && !defender.turn) {
    value = {
      activeTake: false,
      activeDiscard: false,
      turn: false,
      defenceOrOffence: defender.defenceOrOffence,
    };
  } else {
    value = {
      activeTake: false,
      activeDiscard: false,
      turn: false,
      defenceOrOffence: '',
    };
  }

  return {
    type: types.DEFINE_PLAYERS_MOVE,
    payload: value,
  };
}
