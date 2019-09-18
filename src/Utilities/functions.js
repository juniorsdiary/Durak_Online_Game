export function getWidth(size) {
  if (!size) return;
  let width = (size / 12) * 100;
  return `${width}%`;
}

export function definePlayerTitleStyle(num) {
  switch (num) {
    case 0:
      return {
        bottom: '25%',
        left: '23%',
      };
    case 1:
      return {
        top: '3%',
        left: '23%',
      };
    case 2:
      return {
        top: '10%',
        left: '10px',
      };
    case 3:
      return {
        top: '10%',
        right: '10px',
      };
    default:
      return;
  }
}

export function definePlayerStyle(num) {
  switch (num) {
    case 0:
      return {
        bottom: '10px',
        left: '50%',
        marginLeft: '-200px',
        width: '400px',
        height: '141px',
      };
    case 1:
      return {
        top: '10px',
        left: '50%',
        marginLeft: '-200px',
        width: '400px',
        height: '141px',
      };
    case 2:
      return {
        top: '50%',
        marginTop: '-200px',
        marginLeft: '20px',
        width: '107px',
        height: '400px',
      };
    case 3:
      return {
        top: '50%',
        marginTop: '-200px',
        right: '0',
        marginRight: '20px',
        width: '107px',
        height: '400px',
      };
    default:
      return;
  }
}

export function distance(cards) {
  return cards > 20 ? 20 : 400 / cards;
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
