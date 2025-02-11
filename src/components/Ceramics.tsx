"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ClientImage from './ClientImage'; // Importing ClientImage component
import { urlFor } from '../sanity/lib/image'; // Importing the URL builder
import { client } from '../sanity/lib/client'; // Importing the Sanity client

const DEFAULT_IMAGE = '/images/default-image.jpg';

interface Product {
  _id: string;
  name: string;
  price: number;
  slug: {
    current: string;
  };
  image?: {
    asset?: {
      _ref?: string;
    };
  };
}

const Ceramicssec: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = '*[_type == "product"] { _id, name, price, slug, image }';
      const products = await client.fetch(query);
      setProducts(products.slice(0, 4)); // Limiting to 4 products
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full h-auto relative bg-white py-10 md:py-20 px-6 md:px-20">
      <div className="text-[#2a254b] text-[32px] mb-10 md:mb-20">New Ceramics</div>
      <div className="flex justify-center gap-4 flex-wrap">
        {products.map((product) => {
          const imageUrl = product.image?.asset?._ref
            ? urlFor(product.image).url()
            : DEFAULT_IMAGE;

          return (
            <div key={product._id} className="flex flex-col items-start gap-4 w-[180px] md:w-[220px]">
              <div className="w-full relative pb-[100%]">
                <Link href={`/products/${product.slug.current}`} passHref>
                  <div className="absolute top-0 left-0 w-full h-full">
                    <ClientImage
                      src={imageUrl}
                      alt={product.name}
                      fallbackSrc={DEFAULT_IMAGE}
                      className="object-cover w-full h-full rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                      priority
                    />
                  </div>
                </Link>
              </div>
              <div className="text-[#2a254b] text-xl leading-7">{product.name}</div>
              <div className="text-[#2a254b] text-lg leading-[27px]">£{product.price}</div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-10">
        <Link href="/products">
          <div className="px-8 py-4 bg-[#f9f9f9] border text-[#2a254b] text-base leading-normal cursor-pointer hover:bg-[#e6e6e6] transition duration-300">
            View collection
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Ceramicssec;

