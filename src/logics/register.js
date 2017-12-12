import { createLogic } from 'redux-logic';
import { route } from 'utils';
import Cookies from 'js-cookie';
import types from 'constants/ActionTypes';
import {
  loginSuccess,
  registerSuccess,
  registerError,
  setToken
} from 'actions';
import { makeErrorMessage, isPassword, isEmail, isMobilePhone } from 'utils';
import api from 'api';

const registerLogic = createLogic({
  type: types.REGISTER_REQUEST,

  validate({ action }, allow, reject) {
    const locale = Cookies.get('lang') || 'en';
    const username = action.data.username;
    const password = action.data.password;
    //如果输入的是数字组成的字符串，则按手机号码处理 TODO 这里有问题，比如国际手机是什么情况？还有加号‘+’减号‘-’等情况
    if (/^\d+$/.test(username)) {
      if (isMobilePhone(username, locale)) {
        if (!isPassword(password)) {
          reject(registerError(makeErrorMessage({ intl: 'passwordError' })));
        } else {
          allow(action);
        }
      } else {
        reject(registerError(makeErrorMessage({ intl: 'phoneNumberError' })));
      }
    } else {
      if (isEmail(username)) {
        if (!isPassword(password)) {
          reject(registerError(makeErrorMessage({ intl: 'passwordError' })));
        } else {
          allow(action);
        }
      } else {
        reject(registerError(makeErrorMessage({ intl: 'emailError' })));
      }
    }
  },
  process({ action }, dispatch, done) {
    const { nickname, username, password } = action.data;
    api['register']
      .register(nickname, username, password)
      .then(data => {
        dispatch(setToken(data.token));
        dispatch(registerSuccess());
        dispatch(loginSuccess());
        route('/confirm');
      })
      .catch(err => {
        dispatch(registerError(makeErrorMessage(err.response.data.message)));
      })
      .then(() => done());
  }
});

export default [registerLogic];
