import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonProductsAdmin = () => {
  return (
    <>
      {"1234567890".split("").map((index) => (
        <TableRow key={index} className="py-10">
          <TableCell className="text-center">
            <Skeleton className="w-4 h-4 rounded-full" />
          </TableCell>
          <TableCell className="flex items-center justify-center">
            <Skeleton className="w-16 h-16 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[330px] h-4 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[150px] h-4 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[100px] h-4 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-8 h-8 rounded-lg" />
          </TableCell>
          <TableCell>
            <div className="flex items-center justify-center gap-4">
              <Skeleton className="w-8 h-8 rounded-lg" />
              <Skeleton className="w-8 h-8 rounded-lg" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default SkeletonProductsAdmin;
