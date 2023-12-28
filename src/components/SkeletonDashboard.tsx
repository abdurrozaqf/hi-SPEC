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
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonDashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-24 font-poppins mb-0 md:mb-6">
        <div className="text-center lg:text-start shadow-products-card relative p-4 lg:p-4 xl:p-10 rounded-xl bg-white dark:bg-[#1265ae24]">
          <div className="bg-[#FF579A] rounded-full p-3 absolute right-10 hidden xl:block">
            <Box color="white" size={50} />
          </div>
          <p className="font-medium text-[#6B80AA] text-xl">Total Products</p>
          <h1 className="font-bold text-4xl mt-3">
            <Skeleton className="w-10 h-8 mb-8" />
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
            <Skeleton className="w-10 h-8 mb-8" />
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
            <Skeleton className="w-10 h-8 mb-8" />
          </h1>
          <p className="text-black/50 dark:text-white/75 mt-6 tracking-wider">
            Total transactions user from hi’SPEC
          </p>
        </div>
      </div>
      <div className="w-0 md:w-auto px-0 md:px-10 py-0 md:py-8 bg-white dark:bg-[#1265ae24] rounded-xl flex flex-col justify-between grow shadow-products-card font-poppins overflow-auto">
        <Table>
          <TableCaption>A list of recent products.</TableCaption>
          <TableHeader className="sticky top-0 bg-white dark:bg-[#05152D] drop-shadow z-10">
            <TableRow>
              <TableHead className="w-[50px] text-center">No.</TableHead>
              <TableHead className="w-[150px] text-center">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {"1234567890".split("").map((index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-center">
                  <Skeleton className="w-4 h-4 rounded-full" />
                </TableCell>
                <TableCell className="flex justify-center">
                  <Skeleton className="w-14 h-14 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-[300px] h-4 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-[160px] h-4 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-[100px] h-4 rounded-full" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default SkeletonDashboard;
