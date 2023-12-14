import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, X } from "lucide-react";
import React from "react";

const Compare = () => {
  return (
    <Layout>
      <div className="grow bg-white shadow-lg rounded-xl  p-32 font-poppins">
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
          <div className=" h-full   border rounded-md p-8">
            <div className="flex justify-between">
              <div className="flex gap-8">
                <div>
                  <Search />
                </div>
                <p className="">Asus ROG Strix</p>
              </div>
              <div className=" justify-end">
                <X />
              </div>
            </div>
            <img
              src="https://www.asus.com/media/Odin/Websites/global/ProductLine/20200824120842.jpg?webp"
              alt="ROG Strix"
            />
            <div className="flex flex-col text-center gap-2 pt-4 pb-8">
              <p className=" font-bold text-2xl">Asus ROG Strix</p>
              <p className=" font-bold text-3xl">Rp 40.000.000</p>
            </div>
            <div className=" mt-4 flex flex-col gap-8">
              <p>CPU : Intel Core i9</p>
              <p>RAM : dfasf</p>
              <p>Display : dfasf</p>
              <p>Storage : dfasf</p>
              <p>Thickness : dfasf</p>
              <p>Weight : dfasf</p>
              <p>Bluetooth : dfasf</p>
              <p>HDMI : dfasf</p>
            </div>
          </div>
          <div className=" h-full  border rounded-md p-8">
            <div className="flex justify-between">
              <div className="flex gap-8">
                <div>
                  <Search />
                </div>
                <p className=" ">Asus ROG Zephyrus</p>
              </div>
              <div className=" justify-end">
                <X />
              </div>
            </div>
            <img
              src="https://www.asus.com/media/Odin/Websites/global/ProductLine/20200824120814.jpg?webp"
              alt="ROG Zephyrus"
            />
            <div className="flex flex-col text-center gap-2 pt-4 pb-8">
              <p className=" font-bold text-2xl">Asus ROG Zephyrus</p>
              <p className=" font-bold text-3xl">Rp 40.000.000</p>
            </div>
            <div className=" flex flex-col gap-8 mt-4">
              <p>CPU : Intel Core i9</p>
              <p>RAM : dfasf</p>
              <p>Display : dfasf</p>
              <p>Storage : dfasf</p>
              <p>Thickness : dfasf</p>
              <p>Weight : dfasf</p>
              <p>Bluetooth : dfasf</p>
              <p>HDMI : dfasf</p>
            </div>
          </div>
          <div className=" h-full  border rounded-md p-8">
            <div className="flex justify-between">
              <div className="flex gap-8">
                <div>
                  <Search />
                </div>
                <p className="">Asus ROG Flow</p>
              </div>
              <div className=" justify-end">
                <X />
              </div>
            </div>
            <img
              src="https://www.asus.com/media/Odin/Websites/global/ProductLine/20200824120546.jpg?webp"
              alt="ROG Flow"
            />
            <div className="flex flex-col text-center gap-2 pt-4 pb-8">
              <p className=" font-bold text-2xl">Asus ROG Flow</p>
              <p className=" font-bold text-3xl">Rp 40.000.000</p>
            </div>
            <div className=" flex flex-col gap-8 mt-4">
              <p>CPU : Intel Core i9</p>
              <p>RAM : dfasf</p>
              <p>Display : dfasf</p>
              <p>Storage : dfasf</p>
              <p>Thickness : dfasf</p>
              <p>Weight : dfasf</p>
              <p>Bluetooth : dfasf</p>
              <p>HDMI : dfasf</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Compare;
