import { Skeleton } from "@/components/ui/skeleton";

const SkeletonProducts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {"1234567890".split("").map((i) => {
        return (
          <div
            key={i}
            className="w-full h-72 flex flex-col rounded-xl shadow-products-card overflow-auto"
          >
            <div className="flex justify-center py-4 grow">
              <Skeleton className="w-36 h-36 rounded-full" />
            </div>
            <div className="px-4 py-3 flex flex-col gap-3 bg-white dark:bg-[#1265ae24]">
              <Skeleton className="h-4 mr-10 rounded-full" />
              <Skeleton className="h-5 mr-20 rounded-full" />
              <div className="flex justify-end w-full">
                <Skeleton className="h-3 w-[80px] rounded-full" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SkeletonProducts;
