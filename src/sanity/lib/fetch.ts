// src/sanity/fetch.ts
import { client } from "./client";
import { Product } from "../../types/Product";

export const fetchLatestProducts = async (): Promise<Product[]> => {
  const query = `*[_type == "product"] | order(_createdAt desc)[0...4] {
    _id,
    name,
    slug,
    price,
    image{
      asset->{
        _id,
        url
      }
    },
    description,
    dimensions {
      height,
      width,
      depth
    },
    features,
    quantity,
    category->{name},
    _createdAt,
    _updatedAt
  }`;

  return await client.fetch(query);
};

export const fetchPopularProducts = async (): Promise<Product[]> => {
  const query = `*[_type == "product" && "popular products" in tags] | order(price desc)[0...3] {
    _id,
    name,
    slug,
    price,
    image{
      asset->{
        _id,
        url
      }
    },
    description,
    dimensions {
      height,
      width,
      depth
    },
    features,
    quantity,
    category->{name},
    _createdAt,
    _updatedAt
  }`;

  return await client.fetch(query);
};

export const fetchAllProducts = async (): Promise<Product[]> => {
  const query = `*[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    slug,
    price,
    image{
      asset->{
        _id,
        url
      }
    },
    description,
    dimensions {
      height,
      width,
      depth
    },
    features,
    quantity,
    category->{name},
    _createdAt,
    _updatedAt
  }`;

  return await client.fetch(query);
};

export const fetchProductsByCategory = async (
  categoryName: string
): Promise<Product[]> => {
  const query = `*[_type == "product" && category->name == $categoryName] | order(_createdAt desc) {
    _id,
    name,
    slug,
    price,
    image{
      asset->{
        _id,
        url
      }
    },
    description,
    dimensions {
      height,
      width,
      depth
    },
    features,
    quantity,
    category->{name},
    _createdAt,
    _updatedAt
  }`;

  return await client.fetch(query, { categoryName });
};