import { useSearchParams } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { useEffect, useState } from "react";
import debounce from "lodash.debounce";

import SearchCompareBox from "@/components/SearchCompareBox";
import { useToast } from "@/components/ui/use-toast";
import CardCompare from "@/components/CardCompare";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

import { ResponseProducts, getProducts, Product } from "@/utils/apis/products";
import { getDetailProducts } from "@/utils/apis/products/api";
import { useCompareStore } from "@/utils/state";

const Compare = () => {
  const { compares, addCompare, updateCompare, deleteCompare } =
    useCompareStore((state) => state);
  const [datas, setDatas] = useState<ResponseProducts[]>();
  const [searchParams, setSearchParams] = useSearchParams();

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
      const result = await getDetailProducts(id);
      updateCompare(index, result.data);
    } catch (error: any) {
      toast({
        title: "Oops, someting went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  function handleSearch(value: string) {
    if (value !== "") {
      searchParams.set("name", value);
    } else {
      searchParams.delete("name");
    }
    setSearchParams(searchParams);
  }

  const debounceHandle = debounce(
    (search: string) => handleSearch(search),
    500
  );

  return (
    <Layout>
      <div className="bg-white rounded-xl flex flex-col font-poppins shadow-lg p-32 grow overflow-auto dark:bg-[#1265ae24]">
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
            <div className="border rounded-md flex flex-col border-slate-400 h-[75rem] p-6 grow">
              <div className="flex justify-between items-center">
                <div className="flex w-full">
                  <SearchCompareBox
                    placeholder="Search product by name"
                    onSelectProduct={(id) => fetchDetail(id, index)}
                  />
                  {/* <input
                    onChange={(e) => debounceHandle(e.target.value)}
                    type="text"
                    placeholder="Asus ROG Strix"
                    className=" border outline-none mx-4 py-2 px-4 grow dark:bg-transparent"
                  /> */}
                </div>
                <X onClick={() => deleteCompare(index)} />
              </div>
              <div className="flex items-center justify-center grow">
                {Object.keys(data).length !== 0 ? (
                  <CardCompare key={index} data={data as Product} />
                ) : (
                  <p className="flex-1 text-center text-gray-400 items-center">
                    Search Product
                  </p>
                )}
              </div>
            </div>
          ))}
          <Button className="w-fit" onClick={() => addCompare()}>
            add new compare
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Compare;
