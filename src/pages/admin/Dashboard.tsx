import { Box, DollarSign, Users } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Layout from "@/components/Layout";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const datas = [1, 2, 3, 4, 5, 6];

const Dashboard = () => {
  const { toast } = useToast();

  async function fetchData() {
    try {
      // const result = await getProducts();
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
          <h1 className="font-bold text-4xl mt-3">1259</h1>
          <p className="text-black/50 dark:text-white/75 mt-6 tracking-wider">
            Total all products already in hi’SPEC
          </p>
        </div>
        <div className="shadow-products-card relative p-10 rounded-xl bg-white dark:bg-[#1265ae24]">
          <div className="bg-[#5C60F6] rounded-full p-3 absolute right-10">
            <Users color="white" size={50} />
          </div>
          <p className="font-medium text-[#6B80AA] text-xl">Total Users</p>
          <h1 className="font-bold text-4xl mt-3">259</h1>
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
          <h1 className="font-bold text-4xl mt-3">59</h1>
          <p className="text-black/50 dark:text-white/75 mt-6 tracking-wider">
            Total transactions user from hi’SPEC
          </p>
        </div>
      </div>
      <div className="p-10 bg-white dark:bg-[#1265ae24] rounded-xl grow shadow-products-card overflow-auto">
        <input
          type="text"
          placeholder="Search"
          className="w-1/4 placeholder:italic outline-none py-2 px-4 rounded-lg dark:bg-[#05152D] shadow dark:shadow-white mb-10"
        />
        <Table>
          <TableCaption>A list of your recent products.</TableCaption>
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
            {datas.map((index) => (
              <>
                <TableRow key={index}>
                  <TableCell className="font-medium text-center">
                    {index}
                  </TableCell>
                  <TableCell>
                    <img
                      src="src/assets/example-laptop.png"
                      alt="HP 14 inch Laptop 14s-fq0564AU"
                    />
                  </TableCell>
                  <TableCell>HP 14 inch Laptop 14s-fq0564AU</TableCell>
                  <TableCell>Rp.5.299.000</TableCell>
                  <TableCell>Office</TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default Dashboard;
