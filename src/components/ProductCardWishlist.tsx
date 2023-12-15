import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const ProductCardWishlist = () => {
  return (
    <Link to="/">
      <div className="w-[14rem] rounded-xl shadow-products-card overflow-auto relative">
        <div className="flex justify-center py-4">
          <img src="src/assets/example-laptop.png" />
        </div>
        <div className="bg-white px-4 py-3 font-poppins">
          <p className="text-[#757575] font-bold     text-sm tracking-tight truncate">
            HP 14 inch Laptop 14s-fq0564AU
          </p>
          <h1 className="font-bold text-lg">Rp 5.299.000</h1>
          <p className="font-medium text-end text-[0.625rem] mt-4">
            check detail
          </p>
          <hr className="border-2 my-2" />
          <Button variant={"destructive"} className="w-full h-fit p-2 mt-2">
            Delete
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCardWishlist;
