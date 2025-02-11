import { client } from './client';
import { fetchLatestProducts, fetchPopularProducts, fetchAllProducts, fetchProductsByCategory } from '../lib/fetch';
import { Product } from '../../types/Product';

// Fetch Categories
export const getCategories = async () => {
  const query = `*[_type == "category"]{_id, name}`;
  return await client.fetch(query);
};

export const getLatestProducts = async (): Promise<Product[]> => {
  return await fetchLatestProducts();
};

export const getPopularProducts = async (): Promise<Product[]> => {
  return await fetchPopularProducts();
};

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const data = await fetchAllProducts();
    console.log('Fetched Products:', data);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProductsByCategory = async (categoryName: string): Promise<Product[]> => {
  return await fetchProductsByCategory(categoryName);
};
