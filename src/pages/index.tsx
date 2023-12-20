import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import BannerTagline from "@/components/BannerTagline";
import { useToast } from "@/components/ui/use-toast";
import ProductCard from "@/components/ProductCard";
import Layout from "@/components/Layout";

import { getCategoryProducts } from "@/utils/apis/products";

const Home = () => {
  const [multimedias, setMultimedias] = useState([]);
  const [offices, setOffices] = useState([]);
  const [gamings, setGamings] = useState([]);

  const { toast } = useToast();

  // Fetch Api
  async function fetchDataOffice() {
    try {
      const result = await getCategoryProducts(`office`, 5);
      setOffices(result.data);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  async function fetchDataMultimedia() {
    try {
      const result = await getCategoryProducts(`multimedia`, 5);
      setMultimedias(result.data);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  async function fetchDataGaming() {
    try {
      const result = await getCategoryProducts(`gaming`, 5);
      setGamings(result.data);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    fetchDataOffice();
    fetchDataMultimedia();
    fetchDataGaming();
  }, []);

  return (
    <Layout>
      <BannerTagline />
      <div className="flex flex-col gap-8 font-poppins mt-10">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between w-full">
            <h1 className="font-semibold">Recomended for Office</h1>
            <Link to={`/categories/office`}>
              <p className="hover:text-slate-500">see all</p>
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-6">
            {offices.map((office, index) => (
              <ProductCard key={index} data={office} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between w-full">
            <h1 className="font-semibold">Recomended for Multimedia</h1>
            <Link to="/categories/multimedia">
              <p className="hover:text-slate-500">see all</p>
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-6">
            {multimedias.map((multimedia, index) => (
              <ProductCard key={index} data={multimedia} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between w-full">
            <h1 className="font-semibold">Recomended for Gaming</h1>
            <Link to="/categories/gaming">
              <p className="hover:text-slate-500">see all</p>
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-6">
            {gamings.map((gaming, index) => (
              <ProductCard key={index} data={gaming} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
