import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import BannerSponsorWishlist from "@/components/BannerSponsorWishlist";
import ProductCardWishlist from "@/components/ProductCardWishlist";
import SkeletonWishlists from "@/components/SkeletonWishlists";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

import { MyWishlists, deleteWishlist, getProfile } from "@/utils/apis/users";
import { buyProducts } from "@/utils/apis/admin";

const WishList = () => {
  const [wishlists, setWishlists] = useState<MyWishlists[]>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);
    try {
      const result = await getProfile();
      setWishlists(result.data.my_favorite);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteWishlist(favorite_id: number) {
    try {
      const result = await deleteWishlist(favorite_id);
      toast({ description: result.message });
      fetchData();
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  async function handleBuyProduct(data: {
    product_id: number;
    total_price: number;
  }) {
    try {
      const response = await buyProducts(data);
      window.location.replace(`${response.data.url}`);
    } catch (error: any) {
      toast({
        title: "Oops, someting went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  return (
    <Layout>
      <div className="flex flex-col gap-0 lg:gap-8 grow font-poppins">
        <BannerSponsorWishlist />
        {isLoading ? (
          <SkeletonWishlists />
        ) : (
          <>
            {!wishlists && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-xl">All your Wishlists will be saved here</p>
                <p className="text-lg mb-6">
                  Fill in your Wishlist by clicking the heart icon when you find
                  an item you like.
                </p>
                <Button onClick={() => navigate("/products")}>
                  Find Product Now!
                </Button>
              </div>
            )}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grow">
              {wishlists?.map((wishlist, index) => (
                <ProductCardWishlist
                  key={index}
                  data={wishlist}
                  onBuyProdcut={(product_id, total_price) =>
                    handleBuyProduct({
                      product_id: product_id,
                      total_price: total_price,
                    })
                  }
                  onDeleteWishlist={(id) => handleDeleteWishlist(id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default WishList;
