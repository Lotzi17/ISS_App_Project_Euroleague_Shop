import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 – redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ── Auth (UC1) ──────────────────────────────────────────────
export const login = (username, password) =>
  api.post('/auth/login', { username, password });

// ── Products (UC2, UC3, UC4, UC5) ───────────────────────────
export const getProducts = (params = {}) =>
  api.get('/products', { params });

export const getProductById = (id) =>
  api.get(`/products/${id}`);

export const getFilterOptions = () =>
  api.get('/products/filters');

// ── Cart (UC7) ───────────────────────────────────────────────
export const getCart = () =>
  api.get('/cart');

export const addToCart = (productId, quantity = 1) =>
  api.post('/cart/add', { productId, quantity });

export const removeFromCart = (cartItemId) =>
  api.delete(`/cart/${cartItemId}`);

export const clearCart = () =>
  api.delete('/cart/clear');

// ── Favorites (UC6) ──────────────────────────────────────────
export const getFavorites = () =>
  api.get('/favorites');

export const toggleFavorite = (productId) =>
  api.post(`/favorites/toggle/${productId}`);

export const checkFavorite = (productId) =>
  api.get(`/favorites/check/${productId}`);

// ── Admin (UC8, UC9, UC10) ───────────────────────────────────
export const addProduct = (productData) =>
  api.post('/admin/products', productData);

export const updateProduct = (id, productData) =>
  api.put(`/admin/products/${id}`, productData);

export const updateStock = (id, stock) =>
  api.put(`/admin/products/${id}/stock`, { stock });

export const deleteProduct = (id) =>
  api.delete(`/admin/products/${id}`);

export const importProductsCsv = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/admin/import', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export default api;
