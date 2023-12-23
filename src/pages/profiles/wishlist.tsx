import { useEffect, useState } from "react";

import BannerSponsorWishlist from "@/components/BannerSponsorWishlist";
import ProductCardWishlist from "@/components/ProductCardWishlist";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/Layout";

import { MyWishlists, deleteWishlist, getProfile } from "@/utils/apis/users";
import { Loader2 } from "lucide-react";

const WishList = () => {
  const [wishlists, setWishlists] = useState<MyWishlists[]>();
  const [isLoading, setIsLoading] = useState(false);
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
    }
    setIsLoading(false);
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

  return (
    <Layout>
      <div className="flex flex-col gap-0 lg:gap-8 grow">
        <BannerSponsorWishlist />
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <p>Loading</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-5 grow">
              {wishlists?.map((wishlist, index) => (
                <ProductCardWishlist
                  key={index}
                  data={wishlist}
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
