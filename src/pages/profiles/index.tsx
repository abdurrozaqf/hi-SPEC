import { useNavigate } from "react-router-dom";

import Layout from "@/components/Layout";

import { useToken } from "@/utils/contexts/token";

import DefaultAvatar from "/images/default-avatar.png";
import { useState } from "react";

import SkeletonEditProfile from "@/components/SkeletonEditProfile";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useToken();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Layout>
      {isLoading ? (
        <SkeletonEditProfile />
      ) : (
        <>
          <div className="grow bg-white shadow-lg rounded-xl p-4 md:p-8 lg:p-24 font-poppins dark:bg-transparent overflow-auto">
            <h1 className=" mb-16 text-3xl lg:text-4xl font-bold">Profile</h1>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <div className="flex items-center mb-10 md:mb-0">
                <img
                  src={user.avatar || DefaultAvatar}
                  alt={user.name}
                  loading="lazy"
                  className="object-cover rounded-full w-14 lg:w-36 h-14 lg:h-36 shadow-md border"
                />
                <p className="ml-4 md:ml-8 text-xl md:text-3xl font-bold truncate">
                  {user.name}
                </p>
              </div>
              <div
                onClick={() => navigate(`/profile/edit`)}
                className="px-4 py-3 bg-[#E4ECF1] dark:bg-[#1265AE] hover:bg-[#1265AE] hover:dark:bg-[#E4ECF1] hover:text-white hover:dark:text-black w-fit h-fit rounded-lg shadow-md cursor-pointer"
              >
                <p className="font-medium text-base">Edit Profile</p>
              </div>
            </div>
            <div>
              <p className=" font-semibold mb-4 text-xl">Full Name</p>
              <div className="border rounded-md p-4 mb-4">{user.name}</div>
              <p className=" font-semibold mb-4">Email</p>
              <div className="border p-4 mb-4 rounded-md">{user.email}</div>
              <p className="font-semibold mb-4">Password</p>
              <div className=" border p-4 mb-4 rounded-md">********</div>
              <p className=" font-semibold mb-4">Address</p>
              <div className=" border p-4 mb-4 rounded-md">{user.address}</div>
              <p className="font-semibold mb-4">Phone Number</p>
              <div className=" border p-4 mb-4 rounded-md">
                {user.phone_number}
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Profile;
