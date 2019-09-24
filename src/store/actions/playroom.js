import * as types from '../types';

export function setPlayRoomData(data) {
  return { type: types.SET_PLAY_ROOM_DATA, payload: data };
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
  if (curPlayer.id === id) {
    value = {
      activeTake: false,
      activeDiscard: curPlayer.turn,
      turn: curPlayer.turn,
      defenceOrOffence: curPlayer.defenceOrOffence,
    };
  } else if (defender.id === id) {
    value = {
      activeTake: defender.turn,
      activeDiscard: false,
      turn: defender.turn,
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
