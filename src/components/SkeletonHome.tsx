import { Skeleton } from "@/components/ui/skeleton";

const SkeletonHome = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-8 font-poppins mt-0 lg:mt-10">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between w-full">
            <Skeleton className="rounded-full h-4 w-48" />
            <Skeleton className="rounded-full h-4 w-24" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {"12345".split("").map((i) => (
              <div
                key={i}
                className="w-full h-fit flex flex-col rounded-xl shadow-products-card overflow-auto"
              >
                <div className="flex items-center justify-center py-4 grow">
                  <Skeleton className="rounded-full w-36 h-36" />
                </div>
                <div className="bg-white dark:bg-[#1265ae24] px-4 py-3 flex flex-col gap-3">
                  <Skeleton className="rounded-full h-4 mr-10" />
                  <Skeleton className="rounded-full h-5 mr-20 mb-10" />
                  <div className="flex justify-end w-full">
                    <Skeleton className="rounded-full h-3 w-[80px]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between w-full">
            <Skeleton className="rounded-full h-4 w-48" />
            <Skeleton className="rounded-full h-4 w-24" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {"12345".split("").map((i) => (
              <div
                key={i}
                className="w-full h-fit flex flex-col rounded-xl shadow-products-card overflow-auto"
              >
                <div className="flex items-center justify-center py-4 grow">
                  <Skeleton className="rounded-full w-36 h-36" />
                </div>
                <div className="bg-white dark:bg-[#1265ae24] px-4 py-3 flex flex-col gap-3">
                  <Skeleton className="rounded-full h-4 mr-10" />
                  <Skeleton className="rounded-full h-5 mr-20 mb-10" />
                  <div className="flex justify-end w-full">
                    <Skeleton className="rounded-full h-3 w-[80px]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between w-full">
            <Skeleton className="rounded-full h-4 w-48" />
            <Skeleton className="rounded-full h-4 w-24" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {"12345".split("").map((i) => (
              <div
                key={i}
                className="w-full h-fit flex flex-col rounded-xl shadow-products-card overflow-auto"
              >
                <div className="flex items-center justify-center py-4 grow">
                  <Skeleton className="rounded-full w-36 h-36" />
                </div>
                <div className="bg-white dark:bg-[#1265ae24] px-4 py-3 flex flex-col gap-3">
                  <Skeleton className="rounded-full h-4 mr-10" />
                  <Skeleton className="rounded-full h-5 mr-20 mb-10" />
                  <div className="flex justify-end w-full">
                    <Skeleton className="rounded-full h-3 w-[80px]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonHome;
