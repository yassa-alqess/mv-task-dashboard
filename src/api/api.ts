import axios from 'axios';
// Create an instance of Axios
const api = axios.create({
  baseURL: 'https://raqeeb-task.abdulmonaim.top/api/v0.1',
});

// Request interceptor to add the token to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem("accessToken")
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  } else {
    console.error('Access token is missing.');
  }
  return config;
}, error => {
  return Promise.reject(new Error(error.message));
});

// Response interceptor to handle token expiration
api.interceptors.response.use(response => {
  return response;
}, async error => {
  const originalRequest = error.config;


  // if (error.response&& !originalRequest._retry ) {
  if (error.response && error.response.status === 403 && !originalRequest._retry) {
    originalRequest._retry = true;
    const newAccessToken = await refreshToken();
    if (newAccessToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    }
  }
  return Promise.reject(new Error(error.message));
});

async function refreshToken() {

  try {
    const response = await axios.post("https://raqeeb-task.abdulmonaim.top/api/v0.1/auth/refresh-token", {
      refreshToken: localStorage.getItem("refreshToken")
    });
    const newAccessToken = response.data.data.accessToken; // Adjust according to your API response
    const newRefreshToken = response.data.data.refreshToken; // Adjust according to your API response


    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);

    return newAccessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
}

export default api;

