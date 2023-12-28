import { Link } from "react-router-dom";

import { ResponseProducts } from "@/utils/apis/products";
import { formatPrice } from "@/utils/formatter";

interface Props {
  data: Partial<ResponseProducts>;
}

const ProductCard = (props: Props) => {
  const { data } = props;
  return (
    <Link to={`/detail-product/${data.product_id}`}>
      <div className="w-full h-72 flex flex-col rounded-xl shadow-products-card overflow-auto">
        <div className="flex justify-center py-4 grow">
          <img
            src={data.picture}
            alt={data.name}
            loading="lazy"
            className="h-36 w-auto"
          />
        </div>
        <div className="bg-white dark:bg-[#1265ae24] px-4 py-3 font-poppins">
          <p className="text-[#757575] dark:text-[#b5b5b5] font-semibold text-[0.625rem] text-sm tracking-tight truncate">
            {data.name}
          </p>
          <h1 className="font-bold text-lg truncate">
            {formatPrice(data.price!)}
          </h1>
          <p className="font-medium text-end text-[0.625rem] mt-4">
            check detail
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
