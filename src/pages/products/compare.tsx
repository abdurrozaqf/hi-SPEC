import { ArrowLeft, X } from "lucide-react";
import { useEffect, useState } from "react";

import SearchCompareBox from "@/components/SearchCompareBox";
import { useToast } from "@/components/ui/use-toast";
import CardCompare from "@/components/CardCompare";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

import { ResponseProducts, getProducts, Product } from "@/utils/apis/products";
import { getDetailProduct } from "@/utils/apis/products/api";
import { useCompareStore } from "@/utils/state";

const Compare = () => {
  const { compares, addCompare, updateCompare, deleteCompare } =
    useCompareStore((state) => state);
  const [datas, setDatas] = useState<ResponseProducts[]>();

  const { toast } = useToast();

  useEffect(() => {
    fetchDataProduct();
  }, []);

  const fetchDataProduct = async () => {
    try {
      const result = await getProducts();
      const datas = result.data;

      setDatas(datas);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  };

  async function fetchDetail(id: number, index: number) {
    try {
      const result = await getDetailProduct(id);
      updateCompare(index, result.data);
    } catch (error: any) {
      toast({
        title: "Oops, someting went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  return (
    <Layout>
      <div className="bg-white rounded-xl flex flex-col font-poppins shadow-lg p-14 grow overflow-auto dark:bg-[#1265ae24]">
        <div className="flex mb-10 items-center">
          <button className="flex">
            <div className="mr-4">
              <ArrowLeft />
            </div>
            <div>Back</div>
          </button>
          <h1 className="font-bold text-center text-4xl grow">Compare</h1>
        </div>
        <div className="grid gap-4 grid-cols-3 place-items-center">
          {compares.map((data, index) => (
            <div
              key={index}
              className="border border-slate-400 rounded-md flex flex-col w-full h-[50rem] p-6 grow"
            >
              <div className="flex justify-between items-center">
                <div className="flex w-full items-center">
                  <SearchCompareBox
                    placeholder="Search product by name"
                    onSelectProduct={(id) => fetchDetail(id, index)}
                  />
                </div>
                <X onClick={() => deleteCompare(index)} className="ml-2" />
              </div>
              <div className="flex items-start justify-center grow">
                {Object.keys(data).length !== 0 ? (
                  <CardCompare key={index} data={data as Product} />
                ) : (
                  <p className="h-full flex justify-center items-center text-center  text-gray-400 ">
                    Search Product
                  </p>
                )}
              </div>
            </div>
          ))}
          <Button className="w-fit" onClick={() => addCompare()}>
            Add new compare
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Compare;
