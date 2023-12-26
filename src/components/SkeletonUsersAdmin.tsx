import { TableCell, TableRow } from "@/components/ui/table";
import CustomSkeleton from "@/components/Skeleton";

const SkeletonUsersAdmin = () => {
  return (
    <>
      {"1234567890".split("").map((index) => (
        <TableRow key={index}>
          <TableCell className="text-center">
            <CustomSkeleton width="w-4" height="h-4" />
          </TableCell>
          <TableCell>
            <CustomSkeleton width="w-[40px]" height="h-4" />
          </TableCell>
          <TableCell>
            <CustomSkeleton width="w-12" height="h-12" />
          </TableCell>
          <TableCell>
            <CustomSkeleton width="w-[120px]" height="h-4" />
          </TableCell>
          <TableCell>
            <CustomSkeleton width="w-[150px]" height="h-4" />
          </TableCell>
          <TableCell>
            <CustomSkeleton width="w-[230px]" height="h-4" />
          </TableCell>
          <TableCell>
            <CustomSkeleton width="w-[120px]" height="h-4" />
          </TableCell>
          <TableCell>
            <CustomSkeleton width="w-[160px]" height="h-4" />
          </TableCell>
          <TableCell>
            <div className="flex justify-center items-center gap-4">
              <CustomSkeleton width="w-8" height="h-8" rounded="lg" />
              <CustomSkeleton width="w-8" height="h-8" rounded="lg" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default SkeletonUsersAdmin;
