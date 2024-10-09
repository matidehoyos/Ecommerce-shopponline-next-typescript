'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { Product } from '../types/Product'; 

interface ProductsContextProps {
  products: Product[];
  filteredProducts: Product[];
  searchProducts: (query: string) => void; 
  filterByCategory: (category: string) => void; 
}

const ProductsContext = createContext<ProductsContextProps>({
  products: [],
  filteredProducts: [],
  searchProducts: () => {},
  filterByCategory: () => {},
});

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); 

  useEffect(() => {
    const fetchAllProducts = async () => {
      let allProducts: Product[] = [];
      let skip = 0;
      const limit = 100;

      while (true) {
        const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
        const data = await response.json();
        const filteredProducts = data.products.filter((product: Product) => product.category !== 'groceries');
        allProducts = [...allProducts, ...filteredProducts];

        if (data.products.length < limit) break;
        skip += limit;
      }

      setProducts(allProducts);
      setFilteredProducts(allProducts);
    };

    fetchAllProducts();
  }, []);

  const searchProducts = useCallback((query: string) => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products]);
  
  const filterByCategory = useCallback((category: string) => {
    const filtered = products.filter(product => product.category === category);
    setFilteredProducts(filtered);
  }, [products]);
  
  const value = useMemo(
    () => ({ products, filteredProducts, searchProducts, filterByCategory }),
    [products, filteredProducts, searchProducts, filterByCategory] 
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);

