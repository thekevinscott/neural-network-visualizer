const getRange = (num: number, orig: [number, number], target: [number, number]) => {
  const perc = (num - orig[0]) / (orig[1] - orig[0]);
  return perc * (target[1] - target[0]) + target[0]
}

export default getRange;
