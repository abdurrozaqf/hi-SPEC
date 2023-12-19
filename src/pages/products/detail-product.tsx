import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "@/components/Layout";
import useCartProduct from "@/utils/state";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";
import { productDetails } from "@/utils/apis/products/api";

type Product = {
  product_id: number;
  name: string;
  cpu: string;
  ram: string;
  display: string;
  storage: string;
  thickness: string;
  weight: string;
  bluetooth: string;
  hdmi: string;
  price: string;
  category: string;
  image: string;
  picture: string;
};

const DetailProduct = () => {
  const [product, setProduct] = useState<Product>();
  const { cart, addProduk } = useCartProduct();

  const { toast } = useToast();
  const navigate = useNavigate();
  const params = useParams();

  const isInWishlist = useMemo(() => {
    const checkCart = cart.find(
      (item) => item.product_id === +params.product_id!
    );

    if (checkCart) return true;

    return false;
  }, [cart]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await productDetails(3);
      setProduct(result.data);
    } catch (error: any) {
      toast({
        title: "Oops, someting went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  function onClickWishlist() {
    toast({
      description: "Product has been added to Wishlist",
    });
    addProduk(product!);
  }

  return (
    <Layout>
      <div className="flex flex-col gap-10 lg:gap-6 lg:flex-row grow bg-white dark:bg-[#1265ae24] rounded-lg px-10 py-6">
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
            <img src={product?.picture} alt={product?.name} className="w-96" />
          </div>
        </div>

        <div className=" px-6 grow">
          <h3 className="text-[#1E1E1E] dark:text-white font-semibold text-lg mt-4 mb-1">
            {product?.name}
          </h3>
          <h1 className="text-[#1E1E1E] dark:text-white font-bold text-3xl mb-2">
            {product?.price}
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

        <div className="px-6 lg:px-0">
          <div className="border border-solid border-[#D9D9D9] p-3 rounded-lg">
            <div className="m-2">
              <h2 className="font-bold mb-4">Enter the purchase amount here</h2>
              <div className="flex border border-solid border-[#D9D9D9] rounded-md justify-center px-2 py-1">
                {/* <p className="text-[#D9D9D9]">-</p> */}
                <p className="font-semibold">1</p>
                {/* <p className="text-[#48B774]">+</p> */}
              </div>

              <div className="flex justify-between my-1">
                <p>Sub total:</p>
                <h1 className="font-bold text-xl">{product?.price}</h1>
              </div>
              <Button className="w-full bg-[#48B774]">Buy Now</Button>

              <div className="flex justify-between items-center mt-3">
                <p className="text-xs">
                  Make your{" "}
                  <span className="text-ms font-semibold">Wishlist</span> come
                  true!
                </p>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Button
                    onClick={() => onClickWishlist()}
                    disabled={isInWishlist}
                    aria-disabled={isInWishlist}
                    className="bg-transparent hover:bg-block"
                  >
                    <img
                      src="src/assets/wishlist-icon.png"
                      alt="wishlist icon"
                      className="w-6 h-6"
                    />
                    {isInWishlist}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <img src="src/assets/Iklan.png" alt="iklan" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailProduct;
