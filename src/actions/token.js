import types from 'constants/ActionTypes';

export function setToken(token) {
  return { type: types.SET_TOKEN, token };
}

export function removeToken() {
  return { type: types.REMOVE_TOKEN };
}

export function syncToken() {
  return { type: types.SYNC_TOKEN };
}
