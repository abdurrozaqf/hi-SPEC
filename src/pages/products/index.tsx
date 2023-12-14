import { useState } from "react";

import BannerTagline from "@/components/BannerTagline";
import ProductCard from "@/components/ProductCard";
import Layout from "@/components/Layout";

import {
  TypeProducts,
  productsSampleData,
} from "@/utils/apis/products/sample-data";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");

  const handleInputChange = (event: any) => {
    setQuery(event.target.value);
  };

  const filteredItems = productsSampleData.filter(
    (product) => product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // ----------- Radio Filtering -----------
  const handleChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  function filteredData(
    datas: TypeProducts[],
    selected: string,
    query: string
  ) {
    let filteredProducts = datas;

    // Filtering Input Items
    if (query) {
      filteredProducts = filteredItems;
    }

    // Applying selected filter
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
