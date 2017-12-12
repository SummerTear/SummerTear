import axios from 'axios';

export function confirm(data) {
  return axios.post('/api/confirm', { data }).then(response => response.data);
}
