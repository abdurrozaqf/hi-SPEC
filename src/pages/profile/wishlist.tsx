import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import ProductCardWishlist from "@/components/ProductCardWishlist";
import React from "react";

const WishList = () => {
  return (
    <Layout>
      <div className="flex gap-4">
        <ProductCardWishlist />
      </div>
    </Layout>
  );
};

export default WishList;
