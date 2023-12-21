import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Alert from "@/components/AlertDialog";
import Layout from "@/components/Layout";

import { Product, getDetailProduct } from "@/utils/apis/products";
import { useToken } from "@/utils/contexts/token";
import { addWishlist } from "@/utils/apis/users";
import { buyProducts } from "@/utils/apis/admin";
import { formatPrice } from "@/utils/formatter";

import BannerSponsorDetailProduct from "@/assets/Iklan.png";
import IconWishlist from "@/assets/wishlist-icon.png";

const DetailProduct = () => {
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useToken();
  const { toast } = useToast();
  const params = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);
    try {
      const result = await getDetailProduct(+params.product_id!);
      setProduct(result.data);
    } catch (error: any) {
      toast({
        title: "Oops, someting went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleWishlist(product_id: number) {
    try {
      const result = await addWishlist(product_id);
      toast({ description: result.message });
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
      window.open(`${response.data.url}`);
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
      <div className="flex flex-col lg:flex-row gap-10 justify-center lg:gap-6 grow bg-white dark:bg-[#1265ae24] rounded-lg px-0 lg:px-10 py-4 lg:py-6 shadow">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <p>Loading</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col">
              <Button
                onClick={() => navigate(-1)}
                className="flex w-fit h-fit items-center bg-transparent text-black dark:text-white hover:bg-transparent"
              >
                <div className="mr-4">
                  <ArrowLeft />
                </div>
                <div>Back</div>
              </Button>
              <div className="flex items-center justify-center grow">
                <img
                  src={product?.picture}
                  alt={product?.name}
                  className="w-52 lg:w-96"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center px-6 grow">
              <h3 className="text-[#1E1E1E] dark:text-white font-semibold text-xl mt-4 mb-1 truncate">
                {product?.name}
              </h3>
              <h1 className="text-[#1E1E1E] dark:text-white font-bold text-xl lg:text-3xl mb-2">
                {formatPrice(product?.price!)}
              </h1>
              <hr className="bg-[#757575]" />
              <p className="text-[#48B774] font-bold text-base my-2">Details</p>
              <hr className="bg-[#757575]" />

              <h4 className="text-[#1E1E1E] dark:text-white font-bold text-base mt-4">
                Product information
              </h4>
              <p>Category: {product?.category}</p>
              <p>RAM Capacity: {product?.ram}</p>
              <p>Memory Capacity: {product?.storage}</p>
              <p>Processor Type: {product?.cpu}</p>
              <p>Display Size: {product?.display}</p>

              <h4 className="text-[#1E1E1E] dark:text-white font-bold text-base mt-4">
                Specifications
              </h4>
              <p>Thickness: {product?.thickness}</p>
              <p>Bluetooth: {product?.bluetooth}</p>
              <p>HDMI: {product?.hdmi}</p>
              <p>Weight: {product?.weight}</p>
            </div>
            <div className="flex flex-col justify-center items-center px-6">
              {token && (
                <div className="border-none md:border md:border-solid border-[#D9D9D9] p-6 rounded-lg">
                  <h2 className="font-bold mb-4">Purchase amount</h2>
                  <div className="flex border border-solid border-[#D9D9D9] rounded-md justify-center px-2 py-1">
                    <p className="font-semibold">1</p>
                  </div>

                  <div className="flex items-center justify-between my-4">
                    <p>Sub total:</p>
                    <h1 className="font-bold text-base md:text-xl">
                      {formatPrice(product?.price!)}
                    </h1>
                  </div>
                  <Alert
                    title="Are you sure want buy this Product?"
                    description={
                      <>
                        <div className="flex flex-col justify-center items-center mb-10">
                          <img src={product?.picture} className="h-80 w-fit" />
                          <h1 className="font-bold text-2xl text-center">
                            {product?.name}
                          </h1>
                          <p className="font-semibold text-xl">
                            Product price: {formatPrice(product?.price!)}
                          </p>
                        </div>
                      </>
                    }
                    onAction={() =>
                      handleBuyProduct({
                        product_id: product?.product_id!,
                        total_price: product?.price!,
                      })
                    }
                    onActionTitle="Buy Now"
                  >
                    <Button className="w-[17rem] bg-[#48B774]">Buy Now</Button>
                  </Alert>
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-xs">Make your Wishlist come true</p>
                    <div
                      onClick={() => handleWishlist(product?.product_id!)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <p className="font-bold text-xs">Wishlist</p>
                      <img
                        src={IconWishlist}
                        alt="icon-love"
                        className="w-6 h-6 "
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="w-0 lg:w-auto mt-6">
                <img src={BannerSponsorDetailProduct} alt="iklan" />
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default DetailProduct;
