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
  if (type === types.SET_PLAY_ROOM_DATA) {
    return {
      ...state,
      playRoom: payload,
    };
  } else if (type === types.SET_READY) {
    return {
      ...state,
      isReady: payload,
    };
  } else if (type === types.SET_CLIEN_INDEX) {
    return {
      ...state,
      clientIndex: payload,
    };
  } else if (type === types.ASSIGN_PLAYERS_INFO) {
    return {
      ...state,
      [`player${payload[1]}`]: state.playRoom.players[payload[0]],
    };
  } else if (type === types.DEFINE_PLAYERS_MOVE) {
    const { activeTake, activeDiscard, turn, defenceOrOffence } = payload;
    return {
      ...state,
      activeTake,
      activeDiscard,
      turn,
      defenceOrOffence,
    };
  }
  return state;
}
