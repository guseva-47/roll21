import axios from 'axios'

const AXIOS = axios.create({
  baseURL: `/api`,
  timeout: 60000
});

export default {
  ping() {
    return AXIOS.get('/ping');
  },
  auth(user) {
    return AXIOS.post('auth', user)
  },
}


