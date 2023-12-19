import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { User, deleteWishlist } from "@/utils/apis/users";
import { useToken } from "@/utils/contexts/token";

import ProductCardWishlist from "@/components/ProductCardWishlist";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/Layout";

const WishList = () => {
  const [wishlist, setWishlist] = useState<User>();
  const navigate = useNavigate();

  const { toast } = useToast();
  const { user } = useToken();

  async function handleDeleteWishlist(product_id: number) {
    try {
      const result = await deleteWishlist(product_id);

      toast({ description: result.message });
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  return (
    <Layout>
      <div className="flex gap-4">
        <ProductCardWishlist />
      </div>
    </Layout>
  );
};

export default WishList;
