import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getProducts } from "@/utils/apis/products";
import { Meta } from "@/utils/types/api";

import BannerTagline from "@/components/BannerTagline";
import { useToast } from "@/components/ui/use-toast";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import Layout from "@/components/Layout";

const AllByCategories = () => {
  const [datas, setDatas] = useState([]);
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

  function handlePrevNextPage(page: string | number, limit: string | number) {
    searchParams.set("page", String(page));
    searchParams.set("limit", String(limit));
    setSearchParams(searchParams);
  }

  return (
    <Layout>
      <div className="flex flex-col gap-8 grow">
        <div>
          <BannerTagline />
        </div>
        {datas == undefined ? (
          <div className="flex items-center justify-center grow">
            <h1 className="font-semibold  text-slate-500">Laptop not found</h1>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-5 grow">
            {datas?.map((data, index) => {
              return <ProductCard key={index} data={data} />;
            })}
          </div>
        )}
        <div>
          <Pagination
            meta={meta}
            datas={datas.length}
            onClickNext={() => handlePrevNextPage(meta?.page! + 1, 10)}
            onClickPrevious={() => handlePrevNextPage(meta?.page! - 1, 10)}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AllByCategories;
