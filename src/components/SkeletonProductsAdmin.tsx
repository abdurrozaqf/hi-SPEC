import { TableCell, TableRow } from "@/components/ui/table";
import CustomSkeleton from "@/components/Skeleton";

const SkeletonProductsAdmin = () => {
  return (
    <>
      {"1234567890".split("").map((index) => (
        <TableRow key={index} className="py-10">
          <TableCell className="text-center">
            <CustomSkeleton width="w-4" height="h-4" />
          </TableCell>
          <TableCell className="flex items-center justify-center">
            <CustomSkeleton width="w-14" height="h-14" />
          </TableCell>
          <TableCell>
            <CustomSkeleton width="w-[330px]" height="h-4" />
          </TableCell>
          <TableCell>
            <CustomSkeleton width="w-[150px]" height="h-4" />
          </TableCell>
          <TableCell>
            <CustomSkeleton width="w-[100px]" height="h-4" />
          </TableCell>
          <TableCell>
            <CustomSkeleton width="w-8" height="h-8" rounded="lg" />
          </TableCell>
          <TableCell>
            <div className="flex items-center justify-center gap-4">
              <CustomSkeleton width="w-8" height="h-8" rounded="lg" />
              <CustomSkeleton width="w-8" height="h-8" rounded="lg" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default SkeletonProductsAdmin;
