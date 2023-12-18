import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/Layout";

import { Box, DollarSign, Users } from "lucide-react";
import axios from "axios";

type Datas = {
  total_user: string;
  total_product: string;
  total_transaction: string;
  product: {
    id: number;
    category: string;
    name: string;
    price: number;
    picture: string;
  }[];
};

const Dashboard = () => {
  const [datas, setDatas] = useState<Datas>();
  console.log(datas);

  const { toast } = useToast();

  async function fetchData() {
    try {
      const result = await axios.get(
        `https://virtserver.swaggerhub.com/hi_specs/hi_specs/1.0.0/dashboard`
      );
      setDatas(result.data.data);
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
      <div className="grid grid-cols-3 gap-24 font-poppins mb-6">
        <div className="shadow-products-card relative p-10 rounded-xl bg-white dark:bg-[#1265ae24]">
          <div className="bg-[#FF579A] rounded-full p-3 absolute right-10">
            <Box color="white" size={50} />
          </div>
          <p className="font-medium text-[#6B80AA] text-xl">Total Products</p>
          <h1 className="font-bold text-4xl mt-3">
            {datas?.total_product || "0"}
          </h1>
          <p className="text-black/50 dark:text-white/75 mt-6 tracking-wider">
            Total all products already in hi’SPEC
          </p>
        </div>
        <div className="shadow-products-card relative p-10 rounded-xl bg-white dark:bg-[#1265ae24]">
          <div className="bg-[#5C60F6] rounded-full p-3 absolute right-10">
            <Users color="white" size={50} />
          </div>
          <p className="font-medium text-[#6B80AA] text-xl">Total Users</p>
          <h1 className="font-bold text-4xl mt-3">
            {datas?.total_user || "0"}
          </h1>
          <p className="text-black/50 dark:text-white/75 mt-6 tracking-wider">
            Total cerate account in hi’SPEC
          </p>
        </div>
        <div className="shadow-products-card relative p-10 rounded-xl bg-white dark:bg-[#1265ae24]">
          <div className="bg-[#01CC89] rounded-full p-3 absolute right-10">
            <DollarSign color="white" size={50} />
          </div>
          <p className="font-medium text-[#6B80AA] text-xl">
            Total Transactions
          </p>
          <h1 className="font-bold text-4xl mt-3">
            {datas?.total_transaction || "0"}
          </h1>
          <p className="text-black/50 dark:text-white/75 mt-6 tracking-wider">
            Total transactions user from hi’SPEC
          </p>
        </div>
      </div>
      <div className="p-10 bg-white dark:bg-[#1265ae24] rounded-xl grow shadow-products-card overflow-auto font-poppins">
        <Table>
          <TableCaption>A list of recent products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">No.</TableHead>
              <TableHead className="w-[150px] text-center">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datas?.product.map((data, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-center">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <img
                    src="src/assets/example-laptop.png"
                    alt="HP 14 inch Laptop 14s-fq0564AU"
                  />
                </TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>
                  {data.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </TableCell>
                <TableCell>{data.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default Dashboard;
