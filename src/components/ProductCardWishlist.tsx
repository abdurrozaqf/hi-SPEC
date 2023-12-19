import useCartProduct from "@/utils/state";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const ProductCardWishlist = () => {
  const { cart, deleteProduk } = useCartProduct();

  return (
    <Link to="/">
      <div className="w-[14rem] rounded-xl shadow-products-card overflow-auto relative">
        {cart.map((product) => (
          <div key={product.product_id}>
            <div className="flex justify-center py-4">
              <img src={product.picture} />
            </div>
            <div className="bg-white dark:bg-[#1265ae24] px-4 py-3 font-poppins">
              <p className="text-[#757575] dark:text-[#b5b5b5] font-bold text-sm tracking-tight truncate">
                {product.name}
              </p>
              <h1 className="font-bold text-lg">{product.price}</h1>
              <p className="font-medium text-end text-[0.625rem] mt-4">
                check detail
              </p>
              <hr className="border-2 my-2" />
              <Button
                onClick={() => deleteProduk(product)}
                variant={"destructive"}
                className="w-full h-fit p-2 mt-2"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Link>
  );
};

export default ProductCardWishlist;
