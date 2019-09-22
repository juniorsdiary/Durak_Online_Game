export function getWidth(size) {
  if (!size) return;
  let width = (size / 12) * 100;
  return `${width}%`;
}

export function definePlayerStyle(num, name) {
  switch (num) {
    case 0:
      return {
        bottom: '10px',
        left: '50%',
        transform: 'translate(-50%, 0)',
      };
    case 1:
      return {
        top: '10px',
        left: '50%',
        transform: 'translate(-50%, 0)',
      };
    case 2:
      return {
        top: '10px',
        left: '5%',
      };
    case 3:
      return {
        top: '10px',
        right: '5%',
      };
    default:
      return;
  }
}

export function distance(cards) {
  return 300 / cards;
}

export function definePlayerIndex(index, players, addIndex) {
  return index + addIndex >= players ? index + addIndex - players : index + addIndex;
}

export function assignIndexes(index, players) {
  let index1 = index;
  let index2 = definePlayerIndex(index, players, 1);
  let index3 = players >= 3 ? definePlayerIndex(index, players, 2) : -1;
  let index4 = players === 4 ? definePlayerIndex(index, players, 3) : -1;
  return [index1, index2, index3, index4];
}
