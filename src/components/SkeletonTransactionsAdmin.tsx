import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTransactionsAdmin = () => {
  return (
    <>
      {"1234567890".split("").map((index) => (
        <TableRow key={index}>
          <TableCell className="text-center">
            <Skeleton className="w-4 h-4 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-12 h-12 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[120px] h-4 rounded-full" />
          </TableCell>
          <TableCell className="flex justify-center">
            <Skeleton className="w-14 h-14 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[330px] h-4 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[60px] h-4 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[150px] h-4 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[160px] h-4 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[80px] h-4 rounded-full" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default SkeletonTransactionsAdmin;
