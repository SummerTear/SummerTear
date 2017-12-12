import types from 'constants/ActionTypes';

export function loginRequest(data) {
  return { type: types.LOGIN_REQUEST, data };
}
export function loginSuccess() {
  return { type: types.LOGIN_SUCCESS };
}
export function loginError(error) {
  return { type: types.LOGIN_ERROR, error };
}
export function loginFormChange(state) {
  return { type: types.LOGIN_FORM_CHANGE, state };
}

export function logoutSuccess() {
  return { type: types.LOGOUT_SUCCESS };
}
