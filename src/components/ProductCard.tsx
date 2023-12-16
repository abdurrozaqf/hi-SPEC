import { Link } from "react-router-dom";

interface Props {
  name: string;
  img: string;
}

const ProductCard = (props: Props) => {
  const { name, img } = props;
  return (
    <Link to="/detail-product">
      <div className="w-full h-72 flex flex-col rounded-xl shadow-products-card overflow-auto">
        <div className="flex justify-center py-4 grow">
          <img src={img || "src/assets/example-laptop.png"} className="h-36" />
        </div>
        <div className="bg-white dark:bg-[#1265ae24] px-4 py-3 font-poppins">
          <p className="text-[#757575] dark:text-[#b5b5b5] font-bold text-[0.625rem] text-sm tracking-tight truncate">
            {name || "HP 14 inch Laptop 14s-fq0564AU"}
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
