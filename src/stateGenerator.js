export const generateState = () => {
  console.log("generate state");
  return {
    turn: 0,
    activePlayerId: 'human',
    items: generateItems(),
    selectedId: 0,
    winner: undefined,
    events: [{type: 'ENEMY_SPOTTED', itemId: 1}, {type:'GAME_STARTED'}],
  };
};

const generateItems = (size = 10) => {
  const items = [
    {id: 0, hp: 5, type: 'x', playerId: 'human', ap: 1},
    {id: 1, hp: 5, type: 'o', playerId: 'ai', ap: 1},
    {id: 2,type: 'tree'},
    {id: 3,type: 'tree'},
    {id: 4,type: 'tree'},
    {id: 5,type: 'tree'},
    {id: 6,type: 'tree'},
    {id: 7,type: 'tree'},
    {id: 8,type: 'rock'},
    {id: 9,type: 'rock'},
    {id: 10,type: 'rock'},
    {id: 11,type: 'water'},
    {id: 12,type: 'water'},
    {id: 13,type: 'water'},
  ];
  return generatePosition(size, items);
};

const generatePosition = (size, items) => {
  const points = generateRandomMatrix(size);
  return items.map((item) => ({...item, ...points.shift()}));
};

const generateRandomMatrix = (size) => {
  const array = Array.from(Array(size).keys());
  const matrix = array.map((x) => {
    return array.map((y) => {
      return {x, y};
    })
  }).flat();
  shuffleArray(matrix);
  return matrix;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};