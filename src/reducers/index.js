import { combineReducers } from 'redux';
import status from './status';
import login from './login';
import register from './register';
import posts from './posts';
import token from './token';
import settings from './settings';

export default combineReducers({
  status,
  login,
  register,
  posts,
  settings,
  token
});
