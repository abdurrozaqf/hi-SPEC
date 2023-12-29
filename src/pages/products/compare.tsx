import { useNavigate } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { useState } from "react";

import BannerSponsorCompare from "@/components/BannerSponsorCompare";
import SearchCompareBox from "@/components/SearchCompareBox";
import SkeletonCompare from "@/components/SkeletonCompare";
import { useToast } from "@/components/ui/use-toast";
import CardCompare from "@/components/CardCompare";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

import { getDetailProduct } from "@/utils/apis/products/api";
import { Product } from "@/utils/apis/products";
import { useCompareStore } from "@/utils/state";

const Compare = () => {
  const { compares, addCompare, updateCompare, deleteCompare } =
    useCompareStore((state) => state);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function fetchDetail(id: number, index: number) {
    setIsLoading(true);
    try {
      const result = await getDetailProduct(id);
      updateCompare(index, result.data);
    } catch (error: any) {
      toast({
        title: "Oops, someting went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout>
      <div className="flex flex-col grow">
        <BannerSponsorCompare />
        <div className="flex flex-col grow bg-white dark:bg-[#1265ae24] rounded-xl font-poppins px-4 py-6 lg:p-14 overflow-auto shadow-products-card">
          <div className="flex flex-col md:flex-row items-center mb-10">
            <div
              onClick={() => navigate(-1)}
              className="flex md:items-center gap-4 cursor-pointer grow md:grow-0 w-full md:w-auto mb-6 md:mb-0"
            >
              <ArrowLeft />
              <p>Back</p>
            </div>
            <h1 className="font-bold text-center text-4xl grow">Compare</h1>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 place-items-center grow">
            {compares.map((data, index) => (
              <div
                key={index}
                className="border border-slate-400 rounded-md flex flex-col w-full h-[53rem] p-6 grow"
              >
                <div className="flex justify-between items-center mb-8">
                  <div className="flex w-full items-center">
                    <SearchCompareBox
                      placeholder="Search product by name"
                      onSelectProduct={(id) => fetchDetail(id, index)}
                    />
                  </div>
                  <X
                    onClick={() => deleteCompare(index)}
                    className="ml-2 cursor-pointer dark:hover:bg-black/20 rounded-lg"
                  />
                </div>
                {isLoading ? (
                  <SkeletonCompare />
                ) : (
                  <div className="flex items-start justify-center grow">
                    {Object.keys(data).length !== 0 ? (
                      <CardCompare key={index} data={data as Product} />
                    ) : (
                      <p className="h-full flex justify-center items-center text-center  text-gray-400 ">
                        Search Product
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
            <Button className="w-fit text-white" onClick={() => addCompare()}>
              Add new compare
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Compare;
