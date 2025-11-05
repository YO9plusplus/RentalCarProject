import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/auth';

/**
 * Logs in a user.
 * @param {object} credentials - { email, password }
 */
export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  if (response.data.token) {
    // Save the token to local storage for future use
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

/**
 * Registers a new user.
 * @param {object} userData - { name, telephone, email, password }
 */
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

/**
 * Gets the currently logged-in user's info.
 */
export const getMe = async () => {
  const token = localStorage.getItem('token');
  if (!token) return Promise.reject('No token found');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  const response = await axios.get(`${API_URL}/me`, config);
  return response.data;
};

/**
 * Logs out a user by removing the token.
 */
export const logout = () => {
  localStorage.removeItem('token');
};