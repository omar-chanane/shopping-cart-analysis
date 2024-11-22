import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const getTotalSales = async (startDate, endDate) => {
  try {
    const response = await apiClient.get('/analytics/total_sales', {
      params: { startDate, endDate },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des ventes totales:', error);
    throw error;
  }
};
export const getTrendingProducts = async () => {
  try {
    const response = await apiClient.get('/analytics/trending_products');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des produits les plus vendus:', error);
    throw error;
  }
};
export const getCategorySales = async () => {
  try {
    const response = await apiClient.get('/analytics/category_sales');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des ventes par catégorie:', error);
    throw error;
  }
};
export const getProducts = async (page, limit) => {
  try {
    const response = await apiClient.get('/products', { params: { page, limit } });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    throw error;
  }
};
export default apiClient;
