import { createReducer } from 'utils';
import types from 'constants/ActionTypes';
import decode from 'jwt-decode';

const initialState = { obj: {}, raw: undefined };

export default createReducer(initialState, {
  [types.SET_TOKEN](state, action) {
    const tokenObj = decode(action.token);
    return { ...state, obj: tokenObj, raw: action.token };
  },
  [types.REMOVE_TOKEN](state) {
    return { ...state, obj: {}, raw: undefined };
  }
});
