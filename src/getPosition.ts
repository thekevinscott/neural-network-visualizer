const getPosition = (index: number, size: number, len: number) => {
  if (len === 1) {
    return size / 2;
  }
  const total = len - 1;
  const mult = (size / total);
  return mult * index;
};

export default getPosition;
