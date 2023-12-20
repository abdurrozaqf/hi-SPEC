import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import BannerTagline from "@/components/BannerTagline";
import { useToast } from "@/components/ui/use-toast";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import Layout from "@/components/Layout";

import { ResponseProducts, getProducts } from "@/utils/apis/products";
import { Meta } from "@/utils/types/api";

const AllByCategories = () => {
  const [datas, setDatas] = useState<ResponseProducts[]>();
  const [meta, setMeta] = useState<Meta>();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    searchParams.set("category", params.category!);
    setSearchParams(searchParams);
    fetchData();
  }, [searchParams]);

  const { toast } = useToast();
  const params = useParams();

  async function fetchData() {
    try {
      const query = Object.fromEntries([...searchParams]);

      const result = await getProducts({ ...query });
      setDatas(result.data);
      setMeta(result.pagination);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  function handlePrevNextPage(page: string | number) {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  }

  return (
    <Layout>
      <div className="flex flex-col grow justify-between gap-6">
        <div className="space-y-8 flex flex-col">
          <BannerTagline />
          {datas == undefined ? (
            <div className="flex flex-col items-center justify-center">
              <h1 className="font-semibold text-slate-500">Laptop not found</h1>
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-6">
              {datas?.map((data, index) => {
                return <ProductCard key={index} data={data} />;
              })}
            </div>
          )}
        </div>
        <div>
          <Pagination
            meta={meta}
            onClickPage={(page) => handlePrevNextPage(page)}
            onClickNext={() => handlePrevNextPage(meta?.page! + 1)}
            onClickPrevious={() => handlePrevNextPage(meta?.page! - 1)}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AllByCategories;
