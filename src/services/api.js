import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Ensure this environment variable is correctly set in your `.env` file
});

// Fetch users with optional pagination
export const getUsers = async (page = 1, limit = 10) => {
  const response = await api.get(`/users?page=${page}&limit=${limit}`);
  return response.data;
};

// Create a new user
export const createUser = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
};

// Update an existing user
export const updateUser = async (userId, userData) => {
  const response = await api.put(`/users/${userId}`, userData);
  return response.data;
};

// Delete a user by ID
export const deleteUser = async (userId) => {
  try {
    await api.delete(`/users/${userId}`);
    return true; // Indicate success
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error; // Propagate error for handling in component
  }
};

// Add dummy users for testing or seeding
export const addDummyUsers = async () => {
  const response = await api.post('/dummy-users');
  return response.data;
};
