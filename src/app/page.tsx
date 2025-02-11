// src/app/home/page.tsx
import React from "react";
import EmailSignUp from "@/components/EmailSignUp";
import FeaturesSection from "@/components/Features";
import HeroSection from "@/components/Hero";
import ListingsSection from "@/components/Listing";
import PopularListingsSection from "@/components/PopularListing";
import BrandStorySection from "@/components/StorySection";
import { getLatestProducts, getPopularProducts } from "@/sanity/lib/getData";

const Home: React.FC = async () => {
  const latestProducts = await getLatestProducts();
  const popularProducts = await getPopularProducts();

  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <ListingsSection latestProducts={latestProducts} />
      <PopularListingsSection popularProducts={popularProducts} />
      <EmailSignUp />
      <BrandStorySection />
    </div>
  );
};

export default Home;
