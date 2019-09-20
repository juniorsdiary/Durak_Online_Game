import * as types from '../types';

const initialState = {
  playRoom: {},
  isReady: false,
  clientIndex: 0,
  activeTake: false,
  activeDiscard: false,
  turn: false,
  defenceOrOffence: '',
};

export default function playRoomData(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.SET_PLAY_ROOM_DATA:
      return {
        ...state,
        playRoom: payload,
      };
    case types.SET_READY:
      return {
        ...state,
        isReady: payload,
      };
    case types.SET_CLIENT_INDEX:
      return {
        ...state,
        clientIndex: payload,
      };
    case types.ASSIGN_PLAYERS_INFO:
      return { ...state, [`player${payload[1]}`]: state.playRoom.players[payload[0]] };
    case types.DEFINE_PLAYERS_MOVE:
      return {
        ...state,
        activeTake: payload.activeTake,
        activeDiscard: payload.activeDiscard,
        turn: payload.turn,
        defenceOrOffence: payload.defenceOrOffence,
      };
    case types.SET_CONTROLS:
      return {
        ...state,
        activeTake: payload.activeTake,
        activeDiscard: payload.activeDiscard,
      };
    case types.RESET_DATA:
      return { initialState };
    default:
      return state;
  }
}
