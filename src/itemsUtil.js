import {PLAYERS} from "./stateGenerator";

export const isPlayer = (playerId, item) => item.playerId === playerId;
export const matchPlayer = (playerId) => (item) => isPlayer(playerId, item);
export const getSelectedItem = (state) => getItemById(state.selectedId, state.items);
export const getItemById = (id, items) => items.find((item) => item.id === id);
export const getItemsByPlayer = (playerId, items) => items.filter(matchPlayer(playerId));
export const getEnemyItems =  (state) => {
  const otherPlayers = PLAYERS.filter((player) => state.activePlayerId !== player);
  return otherPlayers.flatMap((otherPlayer) => getItemsByPlayer(otherPlayer, state.items));
};
export const inRange = (attacker, target, range = 1) => {
  return Math.abs(target.x - attacker.x) + Math.abs(target.y - attacker.y) <= range;
};
export const updateItemById = (updatedItem, state) => {
  const items = state.items.map(updateItemByIdFn(updatedItem));
  return ({...state, items});
};

export const updateItems = (predicate, updateFn, state) => {
  const items = state.items.map(updateItemFn(predicate, updateFn, state));
  return ({...state, items});
};

export const updateItemFn = (predicate, updateFn) => {
  return el => (predicate(el) ? {...el, ...updateFn(el)} : el);
};

export const updateItemByIdFn = (updatedItem) => {
  return el => (updatedItem.id === el.id ? {...el, ...updatedItem} : el);
};

export const matchId = (id) => {
  return (item) => item.id === id;
};