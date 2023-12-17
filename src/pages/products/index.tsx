import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import BannerTagline from "@/components/BannerTagline";
import { useToast } from "@/components/ui/use-toast";
import ProductCard from "@/components/ProductCard";
import Layout from "@/components/Layout";
import { getProducts } from "@/utils/apis/products";

interface Products {
  product_id: number;
  name: string;
  price: number;
  picture: string;
}

const Products = () => {
  const [datas, setDatas] = useState<Products[]>();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") ?? "";
  const category = searchParams.get("category") ?? "";
  const minPrice = searchParams.get("minPrice") ?? "";
  const maxPrice = searchParams.get("maxPrice") ?? "";

  const { toast } = useToast();

  let url = "";
  function Endpoint(
    name: string,
    category: string,
    minPrice: string,
    maxPrice: string
  ) {
    if (name) {
      url = `/product/search?name=${name}`;
    } else if (name && category) {
      url = `/product/search?name=${name}&category=${category}`;
    } else if ((name && category && minPrice) || maxPrice) {
      url = `/product/search?name=${name}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    }
  }

  // Fetch API
  async function fetchDataName() {
    try {
      const result = await getProducts(name, category, minPrice, maxPrice);

      setDatas(result);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    fetchDataName();
  }, [name, category, maxPrice]);

  return (
    <Layout>
      <BannerTagline />

      {datas == undefined ? (
        <div className="flex items-center justify-center grow border">
          <h1 className="font-semibold  text-slate-500">Laptop not found</h1>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-6 mt-10">
          {datas?.map((data, index) => {
            return <ProductCard key={index} data={data} />;
          })}
        </div>
      )}
    </Layout>
  );
};

export default Products;
