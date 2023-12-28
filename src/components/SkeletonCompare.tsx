import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCompare = () => {
  return (
    <div className="h-full w-full text-center cursor-pointer flex flex-col">
      <div className="h-[10rem] flex justify-center items-center mb-10">
        <Skeleton className="h-40 w-40 rounded-full" />
      </div>
      <div className="flex flex-col items-center gap-4 mb-10 px-6 ">
        <Skeleton className="w-full h-6 rounded-full" />
        <Skeleton className="w-4/5 h-6 rounded-full" />
      </div>
      <div className="flex flex-col items-center gap-4 px-6 grow">
        <Skeleton className="w-4/5 h-4 rounded-full" />
        <Skeleton className="w-4/5 h-4 rounded-full" />
        <Skeleton className="w-4/5 h-4 rounded-full" />
        <Skeleton className="w-4/5 h-4 rounded-full" />
        <Skeleton className="w-4/5 h-4 rounded-full" />
        <Skeleton className="w-4/5 h-4 rounded-full" />
        <Skeleton className="w-4/5 h-4 rounded-full" />
        <Skeleton className="w-4/5 h-4 rounded-full" />
        <Skeleton className="w-4/5 h-4 rounded-full" />
      </div>
      <Skeleton className=" w-[200px] h-3 rounded-full" />
    </div>
  );
};

export default SkeletonCompare;
