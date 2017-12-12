import types from 'constants/ActionTypes';

export function initSuccess() {
  return { type: types.INIT_SUCCESS };
}

export function setStatus(status) {
  return { type: types.SET_STATUS, status };
}

export function syncStatus() {
  return { type: types.SYNC_STATUS };
}
