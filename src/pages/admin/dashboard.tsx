import { Box, DollarSign, Loader2, Users } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import Pagination from "@/components/Pagination";
import Layout from "@/components/Layout";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ResponseDashboard, getDashboard } from "@/utils/apis/admin";
import { formatPrice } from "@/utils/formatter";
import { Meta } from "@/utils/types/api";

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [datas, setDatas] = useState<ResponseDashboard>();
  const [isLoading, setIsLoading] = useState(false);
  const [meta, setMeta] = useState<Meta>();
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  async function fetchData() {
    setIsLoading(true);
    try {
      const query = Object.fromEntries([...searchParams]);
      const result = await getDashboard({ ...query });
      setDatas(result.data);
      setMeta(result.pagination);
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

  function handlePrevNextPage(page: string | number) {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  }

  return (
    <Layout>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <p>Loading</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-24 font-poppins mb-0 md:mb-6">
            <div className="text-center lg:text-start shadow-products-card relative p-4 lg:p-4 xl:p-10 rounded-xl bg-white dark:bg-[#1265ae24]">
              <div className="bg-[#FF579A] rounded-full p-3 absolute right-10 hidden xl:block">
                <Box color="white" size={50} />
              </div>
              <p className="font-medium text-[#6B80AA] text-xl">
                Total Products
              </p>
              <h1 className="font-bold text-4xl mt-3">
                {datas?.total_product || "0"}
              </h1>
              <p className="text-black/50 dark:text-white/75 mt-6 tracking-wider">
                Total all products already in hi’SPEC
              </p>
            </div>
            <div className="text-center lg:text-start shadow-products-card relative p-4 lg:p-4 xl:p-10 rounded-xl bg-white dark:bg-[#1265ae24]">
              <div className="bg-[#5C60F6] rounded-full p-3 absolute right-10 hidden xl:block">
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
            <div className="text-center lg:text-start shadow-products-card relative p-4 lg:p-4 xl:p-10 rounded-xl bg-white dark:bg-[#1265ae24]">
              <div className="bg-[#01CC89] rounded-full p-3 absolute right-10 hidden xl:block">
                <DollarSign color="white" size={50} />
              </div>
              <p className="font-medium text-[#6B80AA] text-xl truncate">
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
          <div className="w-0 md:w-auto px-0 md:px-10 py-0 md:py-8 bg-white dark:bg-[#1265ae24] rounded-xl flex flex-col justify-between grow shadow-products-card font-poppins overflow-auto">
            <Table>
              <TableCaption>A list of recent products.</TableCaption>
              <TableHeader className="sticky top-0 bg-white dark:bg-[#05152D] drop-shadow">
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
                  <TableRow key={data.id}>
                    <TableCell className="font-medium text-center">
                      {(meta?.page! - 1) * meta?.limit! + index + 1}
                    </TableCell>
                    <TableCell>
                      <img src={data.picture} alt={data.name} />
                    </TableCell>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{formatPrice(data.price!)}</TableCell>
                    <TableCell>{data.category}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4">
              <Pagination
                meta={meta}
                onClickPage={(page) => handlePrevNextPage(page)}
                onClickNext={() => handlePrevNextPage(meta?.page! + 1)}
                onClickPrevious={() => handlePrevNextPage(meta?.page! - 1)}
              />
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Dashboard;
