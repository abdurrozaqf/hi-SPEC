import { Skeleton } from "./ui/skeleton";

const SkeletonEditProfile = () => {
  return (
    <div className="grow bg-white shadow-lg rounded-xl p-4 md:p-8 lg:p-24 font-poppins dark:bg-transparent overflow-auto">
      <h1 className=" mb-16 text-3xl lg:text-4xl font-bold">Profile</h1>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <div className="flex items-center mb-10 md:mb-0">
          <img className="object-cover rounded-full w-14 lg:w-36 h-14 lg:h-36 shadow-md border" />
          <p className="ml-4 md:ml-8 text-xl md:text-3xl font-bold truncate"></p>
        </div>
        <div className="px-4 py-3 bg-[#E4ECF1] dark:bg-[#1265AE] hover:bg-[#1265AE] hover:dark:bg-[#E4ECF1] hover:text-white hover:dark:text-black w-fit h-fit rounded-lg shadow-md cursor-pointer">
          <p className="font-medium text-base">Edit Profile</p>
        </div>
      </div>
      <div>
        <Skeleton className="border rounded-md p-4 mb-4"></Skeleton>
        {/* <p className=" font-semibold mb-4">Email</p> */}
        <Skeleton className="border p-4 mb-4 rounded-md"></Skeleton>
        {/* <p className="font-semibold mb-4">Password</p> */}
        <Skeleton className=" border p-4 mb-4 rounded-md"></Skeleton>
        {/* <p className=" font-semibold mb-4">Address</p> */}
        <Skeleton className=" border p-4 mb-4 rounded-md"></Skeleton>
        {/* <p className="font-semibold mb-4">Phone Number</p> */}
        <Skeleton className=" border p-4 mb-4 rounded-md"></Skeleton>
      </div>
    </div>
  );
};

export default SkeletonEditProfile;
