import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { MyWishlist } from "@/utils/apis/users";
import { formatPrice } from "@/utils/formatter";

interface Props {
  data: MyWishlist;
  onDeleteWishlist: (id: number) => void;
}

const ProductCardWishlist = (props: Props) => {
  const { data, onDeleteWishlist } = props;

  return (
    <div
      className="w-full h-fit rounded-xl shadow-products-card overflow-auto relative"
      key={data.product_id}
    >
      <div>
        <Link to={`/detail-product/${data.product_id}`}>
          <div className="flex justify-center py-4">
            <img src={data.picture} className="h-32" />
          </div>
        </Link>
        <div className="bg-white dark:bg-[#1265ae24] px-4 py-3 font-poppins">
          <Link to={`/detail-product/${data.product_id}`}>
            <p className="text-[#757575] dark:text-[#b5b5b5] font-bold text-sm tracking-tight truncate">
              {data.name}
            </p>
            <h1 className="font-bold text-lg">{formatPrice(data.price!)}</h1>
            <p className="font-medium text-end text-[0.625rem] mt-4">
              check detail
            </p>
            <hr className="border-2 my-2" />
          </Link>
          <Button
            onClick={() => onDeleteWishlist(data.favorite_id)}
            variant={"destructive"}
            className="w-full h-fit p-2 mt-2"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardWishlist;
