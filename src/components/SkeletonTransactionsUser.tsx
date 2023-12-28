import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTransactionsUser = () => {
  return (
    <>
      {"1234567890".split("").map((index) => (
        <TableRow key={index}>
          <TableCell className="text-center">
            <Skeleton className="w-4 h-4 rounded-full" />
          </TableCell>
          <TableCell className="flex justify-center">
            <Skeleton className="w-12 h-12 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[350px] h-4 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[80px] h-4 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[140px] h-4 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[150px] h-4 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[90px] h-4 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-8 h-8 rounded-lg" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default SkeletonTransactionsUser;
