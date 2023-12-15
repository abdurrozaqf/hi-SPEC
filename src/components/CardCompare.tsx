import { Search } from "lucide-react";
import React from "react";

interface Props {
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
}

const CardCompare = (props: Props) => {
  const {
    name,
    cpu,
    ram,
    display,
    storage,
    thickness,
    weight,
    bluetooth,
    hdmi,
    price,
    category,
    image,
  } = props;

  return (
    <div>
      <div className=" h-full  rounded-md p-8">
        <img
          src={
            image ||
            "https://www.asus.com/media/Odin/Websites/global/ProductLine/20200824120842.jpg?webp"
          }
          alt="ROG Strix"
        />
        <div className="flex flex-col text-center gap-2 pt-4 pb-8">
          <p className=" font-bold text-2xl">{name || "Asus ROG Strix"}</p>
          <p className=" font-bold text-3xl">{price || "Rp 40.000.000"}</p>
        </div>
        <div className=" mt-4 flex flex-col gap-8">
          <p>CPU : {cpu || "Intel Core i9"}</p>
          <p>RAM : {ram || "dfasf"}</p>
          <p>Display : {display || "dfasf"}</p>
          <p>Storage : {storage || "dfasf"}</p>
          <p>Thickness : {thickness || "dfasf"}</p>
          <p>Weight : {weight || "dfasf"}</p>
          <p>Bluetooth : {bluetooth || "dfasf"}</p>
          <p>HDMI : {hdmi || "dfasf"}</p>
          <p>Category : {category || "gaming"}</p>
        </div>
      </div>
    </div>
  );
};

export default CardCompare;
