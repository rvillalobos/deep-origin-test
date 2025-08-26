// CRUD
export const NEW_PRODUCT = {
    title: 'QA Test Product',
    price: 123,
  };
  
  export const UPDATED_PRODUCT = {
    title: 'Updated QA Product',
  };
  
  //Queries
  export const SEARCH_QUERY: string = 'airpods';
  
  export const PAGINATION: { limit: number; skip: number } = {
    limit: 5,
    skip: 5,
  };
  
  export const SELECT_FIELDS: string = 'title,price';
  
  export const SORTING: { field: string; order: 'asc' | 'desc'; limit: number } = {
    field: 'title',
    order: 'asc', 
    limit: 3,
  };
  //Categories
  export const CATEGORY: string = 'smartphones';
  
  