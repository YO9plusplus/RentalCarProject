import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/bookings';

/**
 * Helper function to get auth headers.
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No auth token found. Please log in.');
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

/**
 * Gets all bookings (for Admin) or only the user's bookings (for User).
 * Your backend /bookings route already handles this logic.
 */
export const fetchMyBookings = async () => {
  const config = getAuthHeaders();
  const response = await axios.get(API_URL, config);
  return response.data; // { success, count, data }
};

/**
 * Gets a single booking by its ID.
 */
export const getBooking = async (id) => {
  const config = getAuthHeaders();
  const response = await axios.get(`${API_URL}/${id}`, config);
  return response.data; // { success, data }
};

/**
 * Creates a new booking.
 * @param {object} bookingData - { date, car: "carId" }
 */
export const createBooking = async (bookingData) => {
  const config = getAuthHeaders();
  const response = await axios.post(API_URL, bookingData, config);
  return response.data; // { success, data }
};

/**
 * Updates an existing booking.
 * @param {string} id - The booking ID
 * @param {object} bookingData - { date, car }
 */
export const updateBooking = async (id, bookingData) => {
  const config = getAuthHeaders();
  const response = await axios.put(`${API_URL}/${id}`, bookingData, config);
  return response.data; // { success, data }
};

/**
 * Deletes a booking.
 * @param {string} id - The booking ID
 */
export const deleteBooking = async (id) => {
  const config = getAuthHeaders();
  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data; // { success, data: {} }
};