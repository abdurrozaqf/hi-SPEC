import { Skeleton } from "@/components/ui/skeleton";
import { useToken } from "@/utils/contexts/token";

const SkeletonDetailProduct = () => {
  const { token } = useToken();

  return (
    <div className="flex flex-col xl:flex-row gap-10 justify-center lg:gap-6 grow">
      <div className="flex flex-col gap-4 px-4">
        <Skeleton className="h-8 w-16" />
        <div className="flex flex-col items-center justify-center grow">
          <Skeleton className="h-60 w-52 lg:w-80" />
        </div>
      </div>
      <div className="flex flex-col justify-center px-6 grow">
        <Skeleton className="rounded-full mt-4 mb-2 h-5 w-full" />
        <Skeleton className="rounded-full mb-2 h-7 w-3/5" />
        <div className="space-y-2 mb-6">
          <hr className="bg-[#757575]" />
          <Skeleton className="rounded-full h-4 w-24" />
          <hr className="bg-[#757575]" />
        </div>
        <div className="flex flex-col gap-y-4 mb-8">
          <Skeleton className="rounded-full h-5 w-2/4" />
          <Skeleton className="rounded-full h-3 w-full" />
          <Skeleton className="rounded-full h-3 w-full" />
          <Skeleton className="rounded-full h-3 w-full" />
          <Skeleton className="rounded-full h-3 w-full" />
          <Skeleton className="rounded-full h-3 w-full" />
        </div>
        <div className="flex flex-col gap-y-4">
          <Skeleton className="rounded-full h-5 w-2/4" />
          <Skeleton className="rounded-full h-3 w-full" />
          <Skeleton className="rounded-full h-3 w-full" />
          <Skeleton className="rounded-full h-3 w-full" />
          <Skeleton className="rounded-full h-3 w-full" />
        </div>
      </div>

      <div className="flex flex-row xl:flex-col justify-center lg:justify-around xl:justify-center items-center px-0 xl:px-6">
        {token && (
          <div className="border-none md:border md:border-solid border-[#D9D9D9] p-6 rounded-lg">
            <Skeleton className="rounded-full h-6 w-3/5 mb-4" />
            <div className="flex border border-solid border-[#D9D9D9] rounded-md justify-center px-2 py-1">
              <Skeleton className="rounded-full h-5 w-5 my-1" />
            </div>

            <div className="flex items-center justify-between my-4">
              <Skeleton className="rounded-full h-5 w-1/4 my-2 mr-4" />
              <Skeleton className="rounded-full h-6 w-4/5 my-2" />
            </div>
            <Skeleton className="h-11 w-full" />
            <Skeleton className="w-[17rem]" />
            <div className="flex justify-between items-center mt-4">
              <Skeleton className="rounded-full w-3/5 h-4 mr-5" />
              <Skeleton className="rounded-full w-1/5 h-3 mr-2" />
              <Skeleton className="rounded-full w-6 h-6" />
            </div>
          </div>
        )}
        <Skeleton className="hidden lg:block w-[300px] h-[400px] xl:h-1/2 mt-6" />
      </div>
    </div>
  );
};

export default SkeletonDetailProduct;
