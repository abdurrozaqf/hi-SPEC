import { Link } from "react-router-dom";

const ProductCard = () => {
  return (
    <Link to="/">
      <div className="w-[14rem] rounded-xl shadow-products-card overflow-auto">
        <div className="flex justify-center py-4">
          <img src="src/assets/example-laptop.png" />
        </div>
        <div className="bg-white px-4 py-3 font-poppins">
          <p className="text-[#757575] font-bold text-[0.625rem] text-sm tracking-tight truncate">
            HP 14 inch Laptop 14s-fq0564AU
          </p>
          <h1 className="font-bold text-lg">Rp 5.299.000</h1>
          <p className="font-medium text-end text-[0.625rem] mt-4">
            check detail
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
