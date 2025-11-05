import axios from 'axios';

// Assuming your cars route is /api/v1/cars
const API_URL = 'http://localhost:3000/api/v1/cars';

/**
 * Fetches all cars. This is public, no token needed.
 */
export const fetchAllCars = async () => {
  const response = await axios.get(API_URL);
  return response.data; // { success, count, data }
};

/**
 * Gets a single car by its ID. Public.
 */
export const getCar = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data; // { success, data }
};