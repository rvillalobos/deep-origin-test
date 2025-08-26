export const BASE_URL = 'https://dummyjson.com';

export const PRODUCTS_ENDPOINT = {
  list: `${BASE_URL}/products`,
  single: (id: number) => `${BASE_URL}/products/${id}`,
  add: `${BASE_URL}/products/add`,
  update: (id: number) => `${BASE_URL}/products/${id}`,
  delete: (id: number) => `${BASE_URL}/products/${id}`
};
