import axios from 'axios';

export function authorize(username, password) {
  return axios
    .post('/api/login', { username, password })
    .then(response => response.data);
}
