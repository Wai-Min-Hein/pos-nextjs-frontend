import axios from 'axios';
import { useRouter } from 'next/router';

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

const axiosInstance = axios.create({
  baseURL: baseApi, // Set your API base URL
  withCredentials: true, // Include cookies for cross-origin requests

});

// Add a response interceptor
axiosInstance.interceptors.response.use(async function (response) {
  const accessToken = response.data.accessToken

  if (accessToken) {
    // Set the Authorization header for all future requests
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    await axios.post('/api/set-cookies', { accessToken });

  }
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, async function (error) {
  const originalRequest = error.config;

  // Check if the error is due to a 401 Unauthorized response
  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true; // Mark the request as retried


    try {
      // Attempt to refresh the access token
      const refreshResponse = await axios.post(`${baseApi}/auth/refresh`, {}, { withCredentials: true });

      const newAccessToken = refreshResponse.data.accessToken;

      if (newAccessToken) {
        // Update the Authorization header with the new access token
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

        // Update the accessToken in cookies
        await axios.post('/api/set-cookies', { accessToken: newAccessToken });

        // Retry the original request with the new access token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      }
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }

  }

  // If the error is not a 401 or token refresh fails, reject the error
  return Promise.reject(error);
});

export default axiosInstance;
