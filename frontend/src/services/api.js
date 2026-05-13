import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can dispatch global actions here if needed
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// --- Analytics APIs ---
export const getMetrics = async () => {
  const response = await api.get('/metrics');
  return response.data;
};

// --- Records CRUD APIs ---
export const getRecords = async (skip = 0, limit = 100) => {
  const response = await api.get(`/records?skip=${skip}&limit=${limit}`);
  return response.data;
};

export const createRecord = async (recordData) => {
  const response = await api.post('/records', recordData);
  return response.data;
};

export const updateRecord = async (recordId, updates) => {
  const response = await api.put(`/records/${recordId}`, updates);
  return response.data;
};

export const deleteRecord = async (recordId) => {
  const response = await api.delete(`/records/${recordId}`);
  return response.data;
};

// --- ML Prediction APIs ---
export const predictIncome = async (features) => {
  const response = await api.post('/predict', features);
  return response.data;
};

export default api;
