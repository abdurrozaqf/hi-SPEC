import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

import BannerTagline from "@/components/BannerTagline";
import { useToast } from "@/components/ui/use-toast";
import ProductCard from "@/components/ProductCard";
import Layout from "@/components/Layout";

import { ResponseProducts, getProducts } from "@/utils/apis/products";

const Home = () => {
  const [multimedias, setMultimedias] = useState<ResponseProducts[]>([]);
  const [offices, setOffices] = useState<ResponseProducts[]>([]);
  const [gamings, setGamings] = useState<ResponseProducts[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchDataOffice();
    fetchDataMultimedia();
    fetchDataGaming();
  }, []);

  // Fetch Api
  async function fetchDataOffice() {
    setIsLoading(true);
    try {
      const result = await getProducts({ category: "office", limit: 5 });
      setOffices(result.data);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchDataMultimedia() {
    setIsLoading(true);
    try {
      const result = await getProducts({ category: "multimedia", limit: 5 });
      setMultimedias(result.data);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchDataGaming() {
    setIsLoading(true);
    try {
      const result = await getProducts({ category: "gaming", limit: 5 });
      setGamings(result.data);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout>
      <BannerTagline />
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <p>Loading</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-8 font-poppins mt-0 lg:mt-10">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between w-full">
                <h1 className="font-semibold">Recomended for Office</h1>
                <Link to={`/categories/office`}>
                  <p className="hover:text-slate-500">see all</p>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {gamings.map((gaming, index) => (
                  <ProductCard key={index} data={gaming} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Home;
