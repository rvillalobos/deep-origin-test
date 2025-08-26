export interface Product {
    id: number;
    title: string;
    description?: string;
    price?: number;
    [key: string]: any; // para permitir campos dinámicos
  }
  