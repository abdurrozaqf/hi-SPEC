import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, X } from "lucide-react";
import React, { useState } from "react";
import { TypeProducts, productsSampleData } from "./sampleDataCompare";
import CardCompare from "@/components/CardCompare";

const Compare = () => {
  const [query1, setQuery1] = useState("");
  const [query2, setQuery2] = useState("");
  const [query3, setQuery3] = useState("");

  const handleInputChange1 = (event: any) => {
    setQuery1(event.target.value);
  };
  const handleInputChange2 = (event: any) => {
    setQuery2(event.target.value);
  };
  const handleInputChange3 = (event: any) => {
    setQuery3(event.target.value);
  };

  const filteredItems1 = productsSampleData.filter(
    (product) => product.name.toLowerCase().indexOf(query1.toLowerCase()) !== -1
  );
  const filteredItems2 = productsSampleData.filter(
    (product) => product.name.toLowerCase().indexOf(query2.toLowerCase()) !== -1
  );
  const filteredItems3 = productsSampleData.filter(
    (product) => product.name.toLowerCase().indexOf(query3.toLowerCase()) !== -1
  );

  function filteredData1(datas: TypeProducts[], query: string) {
    let filteredProducts = datas;

    // Filtering Input Items
    if (query) {
      filteredProducts = filteredItems1;
    }

    return filteredProducts.map(
      ({
        name,
        cpu,
        ram,
        display,
        storage,
        thickness,
        weight,
        bluetooth,
        hdmi,
        price,
        category,
        image,
      }) => (
        <CardCompare
          key={Math.random()}
          name={name}
          cpu={cpu}
          ram={ram}
          display={display}
          storage={storage}
          thickness={thickness}
          weight={weight}
          bluetooth={bluetooth}
          hdmi={hdmi}
          price={price}
          category={category}
          image={image}
        />
      )
    );
  }
  function filteredData2(datas: TypeProducts[], query: string) {
    let filteredProducts = datas;

    // Filtering Input Items
    if (query) {
      filteredProducts = filteredItems2;
    }

    return filteredProducts.map(
      ({
        name,
        cpu,
        ram,
        display,
        storage,
        thickness,
        weight,
        bluetooth,
        hdmi,
        price,
        category,
        image,
      }) => (
        <CardCompare
          key={Math.random()}
          name={name}
          cpu={cpu}
          ram={ram}
          display={display}
          storage={storage}
          thickness={thickness}
          weight={weight}
          bluetooth={bluetooth}
          hdmi={hdmi}
          price={price}
          category={category}
          image={image}
        />
      )
    );
  }
  function filteredData3(datas: TypeProducts[], query: string) {
    let filteredProducts = datas;

    // Filtering Input Items
    if (query) {
      filteredProducts = filteredItems3;
    }

    return filteredProducts.map(
      ({
        name,
        cpu,
        ram,
        display,
        storage,
        thickness,
        weight,
        bluetooth,
        hdmi,
        price,
        category,
        image,
      }) => (
        <CardCompare
          key={Math.random()}
          name={name}
          cpu={cpu}
          ram={ram}
          display={display}
          storage={storage}
          thickness={thickness}
          weight={weight}
          bluetooth={bluetooth}
          hdmi={hdmi}
          price={price}
          category={category}
          image={image}
        />
      )
    );
  }

  const result1 = filteredData1(productsSampleData, query1);
  const result2 = filteredData2(productsSampleData, query2);
  const result3 = filteredData3(productsSampleData, query3);

  return (
    <Layout>
      <div className="grow bg-white dark:bg-transparent shadow-lg rounded-xl  p-32 font-poppins">
        <div className="flex items-center mb-10">
          <button className="flex">
            <div className="mr-4">
              <ArrowLeft />
            </div>
            <div>Back</div>
          </button>
          <h1 className=" grow text-center text-4xl font-bold">Compare</h1>
        </div>
        <div className="grid gap-6 grid-cols-3">
          <div className=" h-fit border rounded-md p-8">
            <div className="flex justify-between">
              <div className="flex w-full">
                <div>
                  <Search />
                </div>
                <input
                  onChange={(e) => setQuery1(e.target.value)}
                  type="text"
                  placeholder="Asus ROG Strix"
                  className=" outline-none grow mx-4 dark:bg-transparent "
                />
              </div>
              <div className="">
                <X />
              </div>
            </div>

            {/* manggil function */}
            {query1 && <>{filteredData1(productsSampleData, query1)}</>}
          </div>

          <div className="  h-fit border rounded-md p-8">
            <div className="flex justify-between">
              <div className="flex w-full">
                <div>
                  <Search />
                </div>
                <input
                  onChange={(e) => setQuery2(e.target.value)}
                  type="text"
                  placeholder="Asus ROG Strix"
                  className=" outline-none grow mx-4 dark:bg-transparent "
                />
              </div>
              <div className="">
                <X />
              </div>
            </div>

            {/* manggil function */}
            {query2 && <>{filteredData2(productsSampleData, query2)}</>}
          </div>

          <div className=" h-fit border rounded-md p-8">
            <div className="flex justify-between">
              <div className="flex w-full">
                <div>
                  <Search />
                </div>
                <input
                  onChange={(e) => setQuery3(e.target.value)}
                  type="text"
                  placeholder="Asus ROG Strix"
                  className=" outline-none grow mx-4 dark:bg-transparent "
                />
              </div>
              <div className="">
                <X />
              </div>
            </div>

            {/* manggil function */}
            {query3 && <>{filteredData3(productsSampleData, query3)}</>}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Compare;
