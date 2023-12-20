import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { deleteWishlist, getDetailUser } from "@/utils/apis/users";
import { useToken } from "@/utils/contexts/token";

import BannerTagline from "@/components/BannerTagline";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

type MyFavorite = {
  favorite_id: number;
  product_id: number;
  name: string;
  price: number;
  picture: string;
};

const WishList = () => {
  const [wishlists, setWishlists] = useState<MyFavorite[]>();
  const { toast } = useToast();
  const { user } = useToken();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getDetailUser(user.user?.user_id.toString()!);

      setWishlists(result.data.my_favorite);
      console.log(result.data);
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
        <BannerTagline />
        <div className="grid gap-14 grid-cols-5 grow">
          {wishlists?.map((wishlist) => {
            return (
              <div
                className="w-full h-fit rounded-xl shadow-products-card overflow-auto relative"
                key={wishlist.product_id}
              >
                <div>
                  <Link to={`/detail-product/${wishlist.product_id}`}>
                    <div className="flex justify-center py-4">
                      <img src={wishlist.picture} className="h-32" />
                    </div>
                  </Link>
                  <div className="bg-white dark:bg-[#1265ae24] px-4 py-3 font-poppins">
                    <Link to={`/detail-product/${wishlist.product_id}`}>
                      <p className="text-[#757575] dark:text-[#b5b5b5] font-bold text-sm tracking-tight truncate">
                        {wishlist.name}
                      </p>
                      <h1 className="font-bold text-lg">
                        {wishlist.price.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </h1>
                      <p className="font-medium text-end text-[0.625rem] mt-4">
                        check detail
                      </p>
                      <hr className="border-2 my-2" />
                    </Link>
                    <Button
                      onClick={() => handleDeleteWishlist(wishlist.favorite_id)}
                      variant={"destructive"}
                      className="w-full h-fit p-2 mt-2"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default WishList;
