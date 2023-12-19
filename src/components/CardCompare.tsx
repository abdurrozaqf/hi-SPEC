import { Product } from "@/utils/apis/products";

interface Props {
  data: Product;
}

const CardCompare = (props: Props) => {
  const { data } = props;

  return (
    <div>
      <div className=" h-full rounded-md p-8 flex flex-col items-center justify-center">
        <img
          src={data.picture || "Unknown"}
          alt={data.name || "Unknown"}
          className=" h-[10rem]"
        />
        <div className="flex flex-col text-center gap-2 pt-4 pb-8">
          <p className=" font-bold text-2xl">{data.name || "Unknown"}</p>
          <p className=" font-bold text-3xl">{data.price || "Unknown"}</p>
        </div>
        <div className=" mt-4 flex flex-col gap-8">
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
