export const PLAYERS = ['human', 'ai'];

export const generateState = () => {
  console.log("generate state");
  return {
    turn: 0,
    activePlayerId: PLAYERS[0],
    items: generateItems(),
    selectedId: 1,
    winner: undefined,
    events: [{type: 'ENEMY_SPOTTED', itemId: 1}, {type: 'GAME_STARTED'}],
  };
};

let itemId = 0;

export const generateId = () => {
  itemId++;
  console.log('Generated id: ' + itemId);
  return itemId;
};

const generateItems = (size = 10) => {
  const items = [
    {id: generateId(), hp: 5, type: 'x', playerId: 'human', ap: 1},
    {id: generateId(), hp: 5, type: 'o', playerId: 'ai', ap: 1},
    {id: generateId(), type: 'tree'},
    {id: generateId(), type: 'tree'},
    {id: generateId(), type: 'tree'},
    {id: generateId(), type: 'tree'},
    {id: generateId(), type: 'tree'},
    {id: generateId(), type: 'tree'},
    {id: generateId(), type: 'rock'},
    {id: generateId(), type: 'rock'},
    {id: generateId(), type: 'rock'},
    {id: generateId(), type: 'water'},
    {id: generateId(), type: 'water'},
    {id: generateId(), type: 'water'},
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