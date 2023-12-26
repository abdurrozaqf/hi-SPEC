import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomSkeleton from "@/components/Skeleton";

const SkeletonDashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-24 font-poppins mb-0 md:mb-6">
        <div className="space-y-4 text-center lg:text-start shadow-products-card relative p-4 lg:p-4 xl:p-10 rounded-xl bg-white dark:bg-[#1265ae24]">
          <div className="p-3 absolute right-10 hidden xl:block">
            <CustomSkeleton width="w-16" height="h-16" />
          </div>
          <CustomSkeleton width="w-[180px]" height="h-4" />
          <CustomSkeleton width="w-10" height="h-8 mb-10" rounded="lg" />
          <CustomSkeleton width="w-2/3" height="h-3" />
        </div>
        <div className="space-y-4 text-center lg:text-start shadow-products-card relative p-4 lg:p-4 xl:p-10 rounded-xl bg-white dark:bg-[#1265ae24]">
          <div className="p-3 absolute right-10 hidden xl:block">
            <CustomSkeleton width="w-16" height="h-16" />
          </div>
          <CustomSkeleton width="w-[180px]" height="h-4" />
          <CustomSkeleton width="w-10" height="h-8 mb-10" rounded="lg" />
          <CustomSkeleton width="w-2/3" height="h-3" />
        </div>
        <div className="space-y-4 text-center lg:text-start shadow-products-card relative p-4 lg:p-4 xl:p-10 rounded-xl bg-white dark:bg-[#1265ae24]">
          <div className="p-3 absolute right-10 hidden xl:block">
            <CustomSkeleton width="w-16" height="h-16" />
          </div>
          <CustomSkeleton width="w-[180px]" height="h-4" />
          <CustomSkeleton width="w-10" height="h-8 mb-10" rounded="lg" />
          <CustomSkeleton width="w-2/3" height="h-3" />
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
                  <CustomSkeleton width="w-4" height="h-4" />
                </TableCell>
                <TableCell className="flex justify-center">
                  <CustomSkeleton width="w-14" height="h-14" />
                </TableCell>
                <TableCell>
                  <CustomSkeleton width="w-[300px]" height="h-4" />
                </TableCell>
                <TableCell>
                  <CustomSkeleton width="w-[160px]" height="h-4" />
                </TableCell>
                <TableCell>
                  <CustomSkeleton width="w-[100px]" height="h-4" />
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
