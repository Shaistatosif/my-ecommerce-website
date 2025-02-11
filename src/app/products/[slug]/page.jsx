/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import React from 'react';
import { client } from '@/sanity/lib/client';
import ProductClient from './ProductClient';

const fetchProduct = async (slug) => {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    description,
    price,
    image {
      asset-> {
        _id,
        url
      }
    },
    slug,
    dimensions {
      height,
      width,
      depth
    },
    features,
    quantity,
    category -> { name },
    _createdAt,
    _updatedAt
  }`;

  const product = await client.fetch(query, { slug });
  return product;
};

const ProductPage = async ({ params }) => {
  const { slug } = params;
  const product = await fetchProduct(slug);

  console.log('Fetched Product:', product);

  if (!product) {
    return <div>Loading...</div>;
  }

  return <ProductClient product={product} />;
};

export async function generateStaticParams() {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);
  return products.map((product) => ({
    params: { slug: product.slug.current },
  }));
}

export default ProductPage;
