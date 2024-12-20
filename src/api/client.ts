import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 30000,
  withCredentials: false,
})

export default client;