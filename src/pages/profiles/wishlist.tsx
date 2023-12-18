import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import ProductCardWishlist from "@/components/ProductCardWishlist";
import { useToast } from "@/components/ui/use-toast";
import { tokenUser } from "@/utils/apis/users";
import { useToken } from "@/utils/contexts/token";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const WishList = () => {
  const [wishlist, setWishlist] = useState<tokenUser>();
  const navigate = useNavigate();
  // const {token, user} = useToken()
  const { toast } = useToast();
  const params = useParams();

  // async function handleAddWishlist(params:type) {
  //   try {
  //     const result = await addWishlist();
  //     toast({ description: result.message });
  //   } catch (error: any) {
  //     toast({
  //       title: "Oops! Something went wrong.",
  //       description: error.toString(),
  //       variant: "destructive",
  //     });
  //   }
  // }

  // async function handleDeleteWishlist(params:type) {
  //   try {
  //     const result = await deleteWishlist();

  //     toast({ description: result.message });
  //   } catch (error: any) {
  //     toast({
  //       title: "Oops! Something went wrong.",
  //       description: error.toString(),
  //       variant: "destructive",
  //     });
  //   }
  // }

  return (
    <Layout>
      <div className="flex gap-4">
        <ProductCardWishlist />
      </div>
    </Layout>
  );
};

export default WishList;
