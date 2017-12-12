import { createLogic } from 'redux-logic';
import { route } from 'utils';
import types from 'constants/ActionTypes';
import { loginSuccess, loginError, setToken, removeToken } from 'actions';
import { makeErrorMessage } from 'utils';
import api from 'api';

const authLogic = createLogic({
  type: types.LOGIN_REQUEST,
  cancelType: types.LOGOUT_SUCCESS,

  process({ action }, dispatch, done) {
    const { username, password } = action.data;
    return api['login']
      .authorize(username, password)
      .then(data => {
        dispatch(setToken(data.token));
        dispatch(loginSuccess());
        route('/', true);
      })
      .catch(err => {
        dispatch(loginError(makeErrorMessage(err.response.data.message)));
      })
      .then(() => done());
  }
});

const logoutLogic = createLogic({
  type: types.LOGOUT_SUCCESS,
  process(depObj, dispatch, done) {
    dispatch(removeToken());
    done();
  }
});

export default [authLogic, logoutLogic];
