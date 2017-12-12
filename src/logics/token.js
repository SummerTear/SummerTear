import { createLogic } from 'redux-logic';
import types from 'constants/ActionTypes';

const setTokenLogic = createLogic({
  type: types.SET_TOKEN,
  process({ getState, action }, dispatch, done) {
    if (getState().status.remember) {
      localStorage.setItem('token', action.token);
    }
    done();
  }
});

const removeTokenLogic = createLogic({
  type: types.REMOVE_TOKEN,
  process(depObj, dispatch, done) {
    localStorage.removeItem('token');
    done();
  }
});

export default [setTokenLogic, removeTokenLogic];
