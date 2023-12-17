import { useParams } from "react-router-dom";
import { getCategoryProducts } from "@/utils/apis/products";

import { useEffect, useState } from "react";

import BannerTagline from "@/components/BannerTagline";
import { useToast } from "@/components/ui/use-toast";
import ProductCard from "@/components/ProductCard";
import Layout from "@/components/Layout";

const AllByCategories = () => {
  const [datas, setDatas] = useState([]);
  const { toast } = useToast();

  const params = useParams();

  async function fetchData() {
    try {
      const result = await getCategoryProducts(params.category!);
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
    fetchData();
  }, []);

  return (
    <Layout>
      <BannerTagline />
      <div className="grid grid-cols-5 gap-6 mt-10">
        {datas.map((data, index) => {
          return <ProductCard key={index} data={data} />;
        })}
      </div>
    </Layout>
  );
};

export default AllByCategories;
