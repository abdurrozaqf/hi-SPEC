import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";

import { Product, getDetailProduct } from "@/utils/apis/products";
import { formatPrice } from "@/utils/formatter";

interface Props {
  transaction_id: number;
}

const DetailTransaction = (props: Props) => {
  const [datas, setDatas] = useState<Product>();
  const [isLoading, setIsLoading] = useState(false);
  const { transaction_id } = props;
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);
    try {
      const result = await getDetailProduct(transaction_id);
      setDatas(result.data);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center text-center text-lg font-medium font-poppins mt-8">
      {isLoading ? (
        <div className="flex items-center justify-center h-32">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <p>Loading</p>
        </div>
      ) : (
        <>
          <img
            src={datas?.picture}
            alt={datas?.name}
            className="h-[10rem] object-cover w-fit mb-3"
          />
          <h1 className="text-xl">{datas?.name}</h1>
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
        </>
      )}
    </div>
  );
};

export default DetailTransaction;
