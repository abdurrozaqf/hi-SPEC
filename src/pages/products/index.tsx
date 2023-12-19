import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getProducts } from "@/utils/apis/products";

import BannerTagline from "@/components/BannerTagline";
import { useToast } from "@/components/ui/use-toast";
import ProductCard from "@/components/ProductCard";
import Layout from "@/components/Layout";

interface Products {
  product_id: number;
  name: string;
  price: number;
  picture: string;
}

const Products = () => {
  const [datas, setDatas] = useState<Products[]>();
  const [searchParams] = useSearchParams();

  const { toast } = useToast();

  useEffect(() => {
    fetchDataName();
  }, [searchParams]);

  // Fetch API
  async function fetchDataName() {
    try {
      const query = Object.fromEntries([...searchParams]);

      const result = await getProducts({ ...query });

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
    <Layout>
      <BannerTagline />
      {datas == undefined ? (
        <div className="border flex items-center justify-center grow">
          <h1 className="font-semibold  text-slate-500">Laptop not found</h1>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 grid-cols-5">
          {datas?.map((data, index) => {
            return <ProductCard key={index} data={data} />;
          })}
        </div>
      )}
    </Layout>
  );
};

export default Products;
