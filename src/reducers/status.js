import { createReducer } from 'utils';
import types from 'constants/ActionTypes';

const initialState = { init: false, loggedIn: false, remember: true };

export default createReducer(initialState, {
  [types.INIT_SUCCESS](state) {
    return { ...state, init: true };
  },
  [types.LOGIN_SUCCESS](state) {
    return { ...state, loggedIn: true };
  },
  [types.LOGOUT_SUCCESS](state) {
    return { ...state, loggedIn: false };
  },
  [types.LOGIN_FORM_CHANGE](state, action) {
    return { ...state, remember: action.state.remember };
  },
  [types.SET_STATUS](state, action) {
    return { ...state, ...action.status };
  }
});
