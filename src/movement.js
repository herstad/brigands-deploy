export const toward = target => mover => {
  const xd = target.x - mover.x;
  const yd = target.y - mover.y;
  return Math.abs(xd) > Math.abs(yd) ? {x: Math.sign(xd), y: 0} : {x: 0, y: Math.sign(yd)};
};

export const move = (mover, direction) => {
  const {x, y} = direction(mover);
  return {...mover, x: (mover.x + x), y: (mover.y + y)}
};