'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useProducts } from '../contexts/productsContext';
import Link from 'next/link';
import { Product } from '../types/Product'; 

const SearchBar = () => {
  const { products } = useProducts(); 
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestedProducts(filteredProducts);
    } else {
      setSuggestedProducts([]); 
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Buscar:', searchQuery);
  };

  return (
    <div className="hidden md:block w-[380px] relative">
      <form onSubmit={handleSearchSubmit} className="flex border border-gray-300 rounded-md overflow-hidden bg-white py-2">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="w-full px-2 text-sm text-gray-700 focus:outline-none"
        />
        <button type="submit" className="px-2 text-gray-700">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>

      {searchQuery.length > 0 && suggestedProducts.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 z-10 max-h-60 overflow-y-auto">
          <ul>
            {suggestedProducts.map((product) => (
              <li key={product.id} className="px-2 py-2 hover:bg-gray-200">
                <Link href={`/product/${product.id}`}>
                  {product.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;


