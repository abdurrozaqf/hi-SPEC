import { useEffect, useState } from "react";

import BannerSponsorWishlist from "@/components/BannerSponsorWishlist";
import ProductCardWishlist from "@/components/ProductCardWishlist";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/Layout";

import { MyWishlist, deleteWishlist, getDetailUser } from "@/utils/apis/users";

const getDatafromLS = () => {
  const data = localStorage.getItem("userID");
  if (data) {
    return JSON.parse(data);
  }
};

const WishList = () => {
  const [wishlists, setWishlists] = useState<MyWishlist[]>();
  const dataUserId = getDatafromLS();
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getDetailUser(dataUserId as string);

      setWishlists(result.data.my_favorite);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
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

  return (
    <Layout>
      <div className="flex flex-col gap-8 grow">
        <BannerSponsorWishlist />
        <div className="grid gap-14 grid-cols-5 grow">
          {wishlists?.map((wishlist, index) => (
            <ProductCardWishlist
              key={index}
              data={wishlist}
              onDeleteWishlist={(id) => handleDeleteWishlist(id)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default WishList;
