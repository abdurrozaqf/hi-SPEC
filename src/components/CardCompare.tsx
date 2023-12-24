import { useNavigate } from "react-router-dom";

import { Product } from "@/utils/apis/products";
import { formatPrice } from "@/utils/formatter";

interface Props {
  data: Product;
}

const CardCompare = (props: Props) => {
  const { data } = props;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/detail-product/${data.product_id}`)}
      className="h-full w-full text-center cursor-pointer flex flex-col"
    >
      <div className="h-[10rem] flex justify-center items-center mb-10">
        <img
          src={data.picture || "Unknown"}
          alt={data.name || "Unknown"}
          className="h-full object-fit object-center"
        />
      </div>
      <div className="flex flex-col mb-6 px-6">
        <p className="font-bold text-lg truncate">{data.name || "Unknown"}</p>
        <p className="font-bold text-lg">
          {formatPrice(data.price!) || "Unknown"}
        </p>
      </div>
      <div className="flex flex-col gap-4 px-6 grow">
        <p className="truncate">CPU : {data.cpu || "Unknown"}</p>
        <p className="truncate">RAM : {data.ram || "Unknown"}</p>
        <p className="truncate">Display : {data.display || "Unknown"}</p>
        <p className="truncate">Storage : {data.storage || "Unknown"}</p>
        <p className="truncate">Thickness : {data.thickness || "Unknown"}</p>
        <p className="truncate">Weight : {data.weight || "Unknown"}</p>
        <p className="truncate">Bluetooth : {data.bluetooth || "Unknown"}</p>
        <p className="truncate">HDMI : {data.hdmi || "Unknown"}</p>
        <p className="truncate">Category : {data.category || "Unknown"}</p>
      </div>
      <p className="text-start font-normal text-xs text-slate-400">
        *Click for see details product
      </p>
    </div>
  );
};

export default CardCompare;
