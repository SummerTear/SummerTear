import axios from 'axios';

export function register(nickname, username, password) {
  return axios
    .post('/api/register', { nickname, username, password })
    .then(response => response.data);
}
