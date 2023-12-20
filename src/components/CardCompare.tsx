import { Product } from "@/utils/apis/products";
import { formatPrice } from "@/utils/formatter";

interface Props {
  data: Product;
}

const CardCompare = (props: Props) => {
  const { data } = props;

  return (
    <div>
      <div className="h-full mt-10 flex flex-col items-center justify-center w-[22rem]">
        <div className="h-[8rem]">
          <img
            src={data.picture || "Unknown"}
            alt={data.name || "Unknown"}
            className="w-[10rem] object-cover"
          />
        </div>
        <div className="flex flex-col text-center w-[22rem] mb-6">
          <p className="font-bold text-lg truncate">{data.name || "Unknown"}</p>
          <p className="font-bold text-lg">
            {formatPrice(data.price!) || "Unknown"}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p>CPU : {data.cpu || "Unknown"}</p>
          <p>RAM : {data.ram || "Unknown"}</p>
          <p>Display : {data.display || "Unknown"}</p>
          <p>Storage : {data.storage || "Unknown"}</p>
          <p>Thickness : {data.thickness || "Unknown"}</p>
          <p>Weight : {data.weight || "Unknown"}</p>
          <p>Bluetooth : {data.bluetooth || "Unknown"}</p>
          <p>HDMI : {data.hdmi || "Unknown"}</p>
          <p>Category : {data.category || "Unknown"}</p>
        </div>
      </div>
    </div>
  );
};

export default CardCompare;
