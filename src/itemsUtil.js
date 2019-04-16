export const isPlayer = (playerId, item) => item.playerId === playerId;
export const matchPlayer = (playerId) => (item) => isPlayer(playerId, item);
export const getItemById = (id, items) => items.find((item) => item.id === id);
export const getItemsByPlayer = (playerId, items) => items.filter(matchPlayer(playerId));