import { useEffect, useState } from "react";

import BannerTagline from "@/components/BannerTagline";
import { useToast } from "@/components/ui/use-toast";
import ProductCard from "@/components/ProductCard";
import Layout from "@/components/Layout";

import {
  TypeProducts,
  productsSampleData,
} from "@/utils/apis/products/sample-data";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categorys, setCategorys] = useState([]);
  const [ranges, setRanges] = useState([]);
  const [names, setNames] = useState([]);

  const { toast } = useToast();

  const [query, setQuery] = useState("");

  const handleInputChange = (event: any) => {
    setQuery(event.target.value);
  };

  const filteredItems = productsSampleData.filter(
    (product) => product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  const handleChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  function filteredData(
    datas: TypeProducts[],
    selected: string,
    query: string
  ) {
    let filteredProducts = datas;

    if (query) {
      filteredProducts = filteredItems;
    }

    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category }) => category === selected
      );
    }

    return filteredProducts.map(({ name, img }) => (
      <ProductCard key={Math.random()} name={name} img={img!} />
    ));
  }

  const result = filteredData(productsSampleData, selectedCategory, query);
  // fetch data apis
  async function fetchDataName() {
    try {
      // const result = await getProduct("name")
      // setOffices(result)
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  async function fetchDataCategory() {
    try {
      // const result = await getProduct("category")
      // setMultimedias(result)
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  async function fetchDataRange() {
    try {
      // const result = await getProduct("range")
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
    fetchDataName();
    fetchDataCategory();
    fetchDataRange();
  }, []);

  return (
    <Layout
      handleChangeSidebar={handleChange}
      handleInputChangeSearch={handleInputChange}
      query={query}
    >
      <BannerTagline />
      <div className="grid grid-cols-5 gap-6 mt-10">{result}</div>
    </Layout>
  );
};

export default Products;
