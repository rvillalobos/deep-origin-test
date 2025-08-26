export const BASE_URL = 'https://dummyjson.com';

export const PRODUCTS_ENDPOINT = {
  list: `${BASE_URL}/products`,
  single: (id: number) => `${BASE_URL}/products/${id}`,
  add: `${BASE_URL}/products/add`,
  update: (id: number) => `${BASE_URL}/products/${id}`,
  delete: (id: number) => `${BASE_URL}/products/${id}`,
  search: (q: string) => `${BASE_URL}/products/search?q=${q}`,
  pagination: (limit: number, skip: number) =>
    `${BASE_URL}/products?limit=${limit}&skip=${skip}`,
  select: (fields: string, limit = 10) =>
    `${BASE_URL}/products?limit=${limit}&select=${fields}`,
  sort: (field: string, order: 'asc' | 'desc', limit = 10) =>
    `${BASE_URL}/products?sortBy=${field}&order=${order}&limit=${limit}`,
  categories: `${BASE_URL}/products/categories`,
  categoryList: `${BASE_URL}/products/category-list`,
  category: (slug: string) => `${BASE_URL}/products/category/${slug}`,
};
