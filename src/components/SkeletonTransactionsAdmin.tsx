import { TableCell, TableRow } from "@/components/ui/table";
import CustomSkeleton from "@/components/Skeleton";

const SkeletonTransactionsAdmin = () => {
  return (
    <>
      {"1234567890".split("").map((index) => (
        <TableRow key={index}>
          <TableCell className="text-center">
            <CustomSkeleton width="w-4" height="h-4" />
          </TableCell>
          <TableCell>
            <CustomSkeleton width="w-12" height="h-12" />
          </TableCell>
          <TableCell>
            <CustomSkeleton width="w-[120px]" height="h-4" />
          </TableCell>
          <TableCell className="flex justify-center">
            <CustomSkeleton width="w-14" height="h-14" />
          </TableCell>
          <TableCell>
            <CustomSkeleton width="w-[330px]" height="h-4" />
          </TableCell>
          <TableCell>
            <CustomSkeleton width="w-[60px]" height="h-4" />
          </TableCell>
          <TableCell>
            <CustomSkeleton width="w-[150px]" height="h-4" />
          </TableCell>
          <TableCell>
            <CustomSkeleton width="w-[160px]" height="h-4" />
          </TableCell>
          <TableCell>
            <CustomSkeleton width="w-[80px]" height="h-4" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default SkeletonTransactionsAdmin;
