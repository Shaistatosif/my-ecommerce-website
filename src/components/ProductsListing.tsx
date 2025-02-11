import React from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: { asset: { url: string } } | null;
  slug: { current: string };
}

const DEFAULT_IMAGE = "/images/default-image.jpg";

const ProductListing: React.FC<{ allProducts: Product[] }> = ({
  allProducts,
}) => {
  return (
    <div className="product-listing w-full h-auto bg-white py-10 md:py-20 px-6 md:px-20">
      <div className="product-grid grid grid-cols-2 md:grid-cols-3 gap-8">
        {allProducts.map((product) => {
          const imageUrl = product.image
            ? product.image.asset.url
            : DEFAULT_IMAGE;

          return (
            <div
              key={product._id}
              className="product-item flex flex-col items-start gap-4 w-full"
            >
              <div
                className="product-image-container w-full relative aspect-w-1 aspect-h-1"
                style={{ height: "0", paddingBottom: "100%" }}
              >
                {" "}
                {/* Set height and aspect ratio */}
                <Link href={`/products/${product.slug.current}`}>
                  <div className="absolute top-0 left-0 w-full h-full">
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      layout="fill"
                      style={{ objectFit: "cover" }} // Use the new style prop
                      quality={75}
                      onError={(e) => {
                        e.currentTarget.src = DEFAULT_IMAGE;
                      }}
                    />
                  </div>
                </Link>
              </div>
              <div className="product-name text-[#2a254b] text-xl leading-7">
                {product.name}
              </div>
              <div className="product-price text-[#2a254b] text-lg leading-[27px]">
                £{product.price}
              </div>
            </div>
          );
        })}
      </div>
      <div className="view-collection flex justify-center mt-10">
        <Link href="/products">
          <div className="px-8 py-4 bg-[#f9f9f9] border text-[#2a254b] text-base leading-normal cursor-pointer hover:bg-[#e6e6e6] transition duration-300">
            View collection
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductListing;
