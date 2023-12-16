import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import BannerTagline from "@/components/BannerTagline";
import { useToast } from "@/components/ui/use-toast";
import ProductCard from "@/components/ProductCard";
import Layout from "@/components/Layout";

import {
  TypeProducts,
  productsSampleData,
} from "@/utils/apis/products/sample-data";

interface Types {
  props: {
    name: string;
    img?: string;
  };
}

const Home = () => {
  const [multimedias, setMultimedias] = useState<Types[]>([]);
  const [offices, setOffices] = useState<Types[]>([]);
  const [gamings, setGamings] = useState<Types[]>([]);

  const { toast } = useToast();

  function filteredData(datas: TypeProducts[], selected: string) {
    let filteredProducts = datas;

    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category }) => category === selected
      );
    }

    return filteredProducts.map(({ name, img }) => (
      <ProductCard key={Math.random()} name={name} img={img!} />
    ));
  }

  const resultOffice = filteredData(productsSampleData, "office");
  const resOffice = () => setOffices(resultOffice);

  const resultMultimedia = filteredData(productsSampleData, "multimedia");
  const resMultimedia = () => setMultimedias(resultMultimedia);

  const resultGaming = filteredData(productsSampleData, "gaming");
  const resGaming = () => setGamings(resultGaming);

  // fetch data apis
  async function fetchDataOffice() {
    try {
      // const result = await getProduct("office")
      // setOffices(result)
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
      // const result = await getProduct("multimedia")
      // setMultimedias(result)
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
      // const result = await getProduct("gaming")
      // setGamings(result)
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    resOffice();
    resMultimedia();
    resGaming();

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
            <Link to="/">
              <p className="hover:text-slate-500">see all</p>
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-6">
            {offices
              .map((office, index) =>
                index < 5 ? (
                  <ProductCard
                    key={index}
                    name={office.props.name}
                    img={office.props.img!}
                  />
                ) : undefined
              )
              .filter((office) => office !== undefined)}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between w-full">
            <h1 className="font-semibold">Recomended for Office</h1>
            <Link to="/">
              <p className="hover:text-slate-500">see all</p>
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-6">
            {multimedias
              .map((multimedia, index) =>
                index < 5 ? (
                  <ProductCard
                    key={index}
                    name={multimedia.props.name}
                    img={multimedia.props.img!}
                  />
                ) : undefined
              )
              .filter((multimedia) => multimedia !== undefined)}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between w-full">
            <h1 className="font-semibold">Recomended for Office</h1>
            <Link to="/">
              <p className="hover:text-slate-500">see all</p>
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-6">
            {gamings
              .map((gaming, index) =>
                index < 5 ? (
                  <ProductCard
                    key={index}
                    name={gaming.props.name}
                    img={gaming.props.img!}
                  />
                ) : undefined
              )
              .filter((gaming) => gaming !== undefined)}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
