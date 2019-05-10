export const toward = (mover, target) => {
  const xd = target.x - mover.x;
  const yd = target.y - mover.y;
  return Math.abs(xd) > Math.abs(yd) ? {x: Math.sign(xd), y: 0} : {x: 0, y: Math.sign(yd)};
};

export const moveFn = (item, {x, y}) => {
  return {...item, x: (item.x + x), y: (item.y + y)}
};