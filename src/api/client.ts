import axios from 'axios';

const client = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
  timeout: 30000,
  withCredentials: true,
})

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    if(error.response.status === 401) {
      try {
        // Access Token 토근 재발급
        const result = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/refresh-token`, {}, { withCredentials: true });
        console.log('refresh accessToken: ', result);

        // API 재 호출
        return client(error.config);
      } catch (refreshError) {
        console.error('Session Expired. Please log in again.');

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
)

export default client;