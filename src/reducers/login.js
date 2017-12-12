import { createReducer } from 'utils';
import types from 'constants/ActionTypes';

const initialState = {
  formState: { username: '', password: '', remember: true },
  error: '',
  sending: false,
  loggedIn: false
};

export default createReducer(initialState, {
  [types.LOGIN_REQUEST](state) {
    return { ...state, sending: true };
  },
  [types.LOGIN_FORM_CHANGE](state, action) {
    return { ...state, formState: action.state, error: '' };
  },
  [types.LOGIN_SUCCESS](state) {
    return { ...state, loggedIn: true, sending: false };
  },
  [types.LOGIN_ERROR](state, action) {
    return { ...state, error: action.error, sending: false };
  },
  [types.LOGOUT_SUCCESS](state) {
    return { ...state, loggedIn: false };
  }
});
