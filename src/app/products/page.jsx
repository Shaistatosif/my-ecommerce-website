"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ImageOnly from '@/components/ImageOnly';
import Filters from '@/components/Filters';
import ProductListing from '@/components/ProductsListing';
import { getAllProducts, getProductsByCategory } from '@/sanity/lib/getData';

const ProductsPageContent = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category'); // Get the category from query parameters
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (category) {
        // Fetch products based on category if available
        const productsByCategory = await getProductsByCategory(category);
        setProducts(productsByCategory);
      } else {
        // Fetch all products if no category is specified
        const allProducts = await getAllProducts();
        setProducts(allProducts);
      }
    };

    fetchProducts();
  }, [category]);

  const handleProductsChange = (filteredProducts) => {
    setProducts(filteredProducts);
  };

  return (
    <div>
      <ImageOnly />
      <Filters onProductsChange={handleProductsChange} />
      <ProductListing allProducts={products} />
    </div>
  );
};

const ProductsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPageContent />
    </Suspense>
  );
};

export default ProductsPage;

