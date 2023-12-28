import { Skeleton } from "./ui/skeleton";
import Alert from "./AlertDialog";

const SkeletonDetail = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-10 justify-center lg:gap-6 grow">
      <div className="flex items-center justify-center grow">
        <Skeleton className="h-60 w-full" />
      </div>
      <div className="flex flex-col justify-center px-6 grow">
        <Skeleton className="mt-4 mb-1 h-8 w-full" />
        <Skeleton className="mb-2 h-10 w-3/5" />
        <hr className="bg-[#757575]" />
        <Skeleton className="my-2 h-6 w-24" />
        <hr className="bg-[#757575]" />

        <Skeleton className="h-6 w-2/4 mt-4" />
        <Skeleton className="h-5 w-full my-2" />
        <Skeleton className="h-5 w-full my-2" />
        <Skeleton className="h-5 w-full my-2" />
        <Skeleton className="h-5 w-full my-2" />
        <Skeleton className="h-5 w-full my-2" />

        <Skeleton className="h-6 w-2/4 mt-4" />
        <Skeleton className="h-5 w-full my-2" />
        <Skeleton className="h-5 w-full my-2" />
        <Skeleton className="h-5 w-full my-2" />
        <Skeleton className="h-5 w-full my-2" />
      </div>

      <div className="flex flex-row xl:flex-col justify-center lg:justify-around xl:justify-center items-center px-0 xl:px-6">
        <div className="border-none md:border md:border-solid border-[#D9D9D9] p-6 rounded-lg">
          <Skeleton className="h-6 w-3/5 my-2" />
          <div className="flex border border-solid border-[#D9D9D9] rounded-md justify-center px-2 py-1">
            <Skeleton className="h-5 w-6 my-1" />
          </div>

          <div className="flex items-center justify-between my-4">
            <Skeleton className="h-5 w-1/4 my-2 mr-4" />
            <Skeleton className="h-6 w-4/5 my-2" />
          </div>

          <Skeleton className="h-11 w-full" />

          <Alert
            title="Are you sure want buy this Product?"
            description={
              <>
                <div className="flex flex-col justify-center items-center mb-10">
                  <Skeleton className="h-80 w-fit" />
                  <Skeleton className="font-bold text-xl text-center" />
                  <Skeleton className="font-semibold text-2xl" />
                </div>
              </>
            }
          >
            <Skeleton className="w-[17rem] bg-[#48B774]" />
          </Alert>
          <div className="flex justify-between items-center">
            <Skeleton className="w-3/5 h-6 mr-5" />
            <Skeleton className="w-1/5 h-6 mr-2" />
            <Skeleton className="w-1/6 h-6" />
          </div>
        </div>

        <Skeleton className="w-full h-full mt-6" />
      </div>
    </div>
  );
};

export default SkeletonDetail;
