import axios from 'axios';
import store from '../store/index';

export function updateAccount(data, password) {
  return axios
    .post(
      '/api/settings/account',
      { ...data, password },
      { headers: { Authorization: `Bearer ${store.getState().token.raw}` } }
    )
    .then(response => response.data);
}

export function updatePassword(current, password) {
  return axios
    .post(
      '/api/settings/password',
      { current, password },
      { headers: { Authorization: `Bearer ${store.getState().token.raw}` } }
    )
    .then(response => response.data);
}
