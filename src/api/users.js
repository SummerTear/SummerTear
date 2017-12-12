import axios from 'axios';
import store from 'store';

export function usernameAvailable(username) {
  return axios
    .post(
      '/api/users/username_available',
      { username },
      { headers: { Authorization: `Bearer ${store.getState().token.raw}` } }
    )
    .then(response => response.data);
}

export function emailAvailable(email) {
  return axios
    .post(
      '/api/users/email_available',
      { email },
      { headers: { Authorization: `Bearer ${store.getState().token.raw}` } }
    )
    .then(response => response.data);
}
