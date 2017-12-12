import types from 'constants/ActionTypes';

export function registerRequest(data) {
  return { type: types.REGISTER_REQUEST, data };
}
export function registerSuccess() {
  return { type: types.REGISTER_SUCCESS };
}
export function registerError(error) {
  return { type: types.REGISTER_ERROR, error };
}
export function registerFormChange(state) {
  return { type: types.REGISTER_FORM_CHANGE, state };
}
