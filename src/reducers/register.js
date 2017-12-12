import { createReducer } from 'utils';
import types from 'constants/ActionTypes';

const initialState = {
  formState: { nickname: '', username: '', password: '' },
  error: '',
  sending: false
};

export default createReducer(initialState, {
  [types.REGISTER_REQUEST](state) {
    return { ...state, sending: true };
  },
  [types.REGISTER_FORM_CHANGE](state, action) {
    return { ...state, formState: action.state, error: '' };
  },
  [types.REGISTER_SUCCESS](state) {
    return { ...state, sending: false };
  },
  [types.REGISTER_ERROR](state, action) {
    return { ...state, error: action.error, sending: false };
  }
});
