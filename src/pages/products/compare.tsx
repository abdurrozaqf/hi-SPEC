import { ArrowLeft, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import CardCompare from "@/components/CardCompare";
import Layout from "@/components/Layout";
import { Product, getProducts } from "@/utils/apis/products";

import { useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import debounce from "lodash.debounce";
import { getDetailProducts } from "@/utils/apis/products/api";

const Compare = () => {
  const [datas, setDatas] = useState<Product[]>();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(datas);

  const { toast } = useToast();

  const fetchDataProduct = async () => {
    try {
      const query = Object.fromEntries([...searchParams]);
      const result = await getProducts({ ...query });
      const datas = result.data;

      const promises = datas.map(async (data: any) => {
        const res = await getDetailProducts(data.product_id);
        const dataProducts = res.data;
        console.log("data product", dataProducts);

        return dataProducts;
      });
      const results: any = await Promise.all(promises);
      setDatas(results);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  };

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

  useEffect(() => {
    searchParams.set("limit", "1");
    setSearchParams(searchParams);
    fetchDataProduct();
  }, [searchParams]);

  return (
    <Layout>
      <div className="grow bg-white dark:bg-[#1265ae24] shadow-lg rounded-xl  p-32 font-poppins">
        <div className="flex items-center mb-10">
          <button className="flex">
            <div className="mr-4">
              <ArrowLeft />
            </div>
            <div>Back</div>
          </button>
          <h1 className=" grow text-center text-4xl font-bold">Compare</h1>
        </div>
        <div className="grid gap-6 grid-cols-3">
          <div className=" h-fit border rounded-md p-8">
            <div className="flex justify-between">
              <div className="flex w-full">
                <div>
                  <Search />
                </div>
                <input
                  onChange={(e) => debounceHandle(e.target.value)}
                  type="text"
                  placeholder="Asus ROG Strix"
                  className=" outline-none grow mx-4 dark:bg-transparent border py-2 px-4"
                />
              </div>
              <div className="">
                <X />
              </div>
            </div>
            {datas?.map((data, index) => (
              <CardCompare key={index} data={data} />
            ))}
          </div>

          {/* <CardCompare data={datas![0]} /> */}
          {/* <p>{datas![0].name}</p> */}
        </div>
      </div>
    </Layout>
  );
};

export default Compare;
