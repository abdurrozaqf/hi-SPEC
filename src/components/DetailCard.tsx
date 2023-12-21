import { useEffect, useState } from "react";

import { useToast } from "@/components/ui/use-toast";

import { getDetailProduct } from "@/utils/apis/products";
import { formatPrice } from "@/utils/formatter";

interface Props {
  product_id: number;
}

type Product = {
  product_id: number;
  category: string;
  name: string;
  cpu: string;
  ram: string;
  display: string;
  storage: string;
  thickness: string;
  weight: string;
  bluetooth: string;
  hdmi: string;
  price: number;
  picture: string;
};

const DetailCard = (props: Props) => {
  const [datas, setDatas] = useState<Product>();
  const { product_id } = props;
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getDetailProduct(product_id);

      setDatas(result.data);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex flex-col items-center text-center text-lg font-medium">
      <img
        src={datas?.picture}
        alt={datas?.name}
        className="h-[10rem] w-fit mb-3"
      />
      <h1>{datas?.name}</h1>
      <p>Processor: {datas?.cpu}</p>
      <p>RAM: {datas?.ram}</p>
      <p>Display: {datas?.display}</p>
      <p>Storage with: {datas?.storage}</p>
      <p>Thickness: {datas?.thickness}</p>
      <p>Weight: {datas?.weight}</p>
      <p>Bluetooth: {datas?.bluetooth}</p>
      <p>HDMI: {datas?.hdmi}</p>
      <p>Recomended for {datas?.category}</p>
      <p className="font-bold text-2xl">{formatPrice(datas?.price!)}</p>
    </div>
  );
};

export default DetailCard;
