export function getWidth(size) {
  if (!size) return;
  let width = (size / 12) * 100;
  return `${width}%`;
}

export const convertTime = time => {
  let now = new Date(),
    lastUpdate = new Date(time),
    dif = now - lastUpdate;

  if (dif < 86400000) {
    return `${dif / 3600000 > 0 ? Math.ceil(dif / 3600000) + ' hours' : ''}${
      dif / 60000 > 0 && dif / 60000 < 60 ? Math.ceil(dif / 60000) + ' minutes' : ''
    }${dif / 1000 > 0 && dif / 1000 < 60 ? Math.ceil(dif / 1000) + ' seconds' : ''}`;
  } else if (dif > 86400000 && dif < 86400000 * 2) {
    return `yesterday`;
  } else if (dif < 86400000 * 30) {
    return `${Math.ceil(dif / 86400000)} days ago`;
  } else if (now.getFullYear() === lastUpdate.getFullYear()) {
    return `${lastUpdate.getDate()} ${lastUpdate.toLocaleString('en-US', {
      month: 'short',
    })}`;
  } else {
    return `${lastUpdate.getDate()} ${lastUpdate.toLocaleString('en-US', {
      month: 'short',
    })} ${lastUpdate.getFullYear()}`;
  }
};
