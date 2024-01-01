import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import SkeletonProfileUser from "@/components/SkeletonProfileUser";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

import { Profile, getProfile } from "@/utils/apis/users";

import DefaultAvatar from "/images/default-avatar.png";

const ProfileUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<Profile>();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);
    try {
      const result = await getProfile();
      setUser(result.data.user);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout>
      {isLoading ? (
        <SkeletonProfileUser />
      ) : (
        <>
          <div className="grow bg-white shadow-lg rounded-xl p-4 md:p-8 lg:p-24 font-poppins dark:bg-transparent overflow-auto">
            <h1 className=" mb-16 text-3xl lg:text-4xl font-bold">Profile</h1>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <div className="flex items-center mb-10 md:mb-0">
                <img
                  src={user?.avatar || DefaultAvatar}
                  alt={user?.name}
                  loading="lazy"
                  className="object-cover rounded-full w-14 lg:w-36 h-14 lg:h-36 shadow-md border"
                />
                <p className="ml-4 md:ml-8 text-xl md:text-3xl font-bold truncate">
                  {user?.name}
                </p>
              </div>
              <Button onClick={() => navigate(`/profile/edit`)}>
                <p className="font-medium text-base">Edit Profile</p>
              </Button>
            </div>
            <div>
              <p className=" font-semibold mb-4 text-xl">Full Name</p>
              <div className="border rounded-md p-4 mb-4">{user?.name}</div>
              <p className=" font-semibold mb-4">Email</p>
              <div className="border p-4 mb-4 rounded-md">{user?.email}</div>
              <p className="font-semibold mb-4">Password</p>
              <div className=" border p-4 mb-4 rounded-md">********</div>
              <p className=" font-semibold mb-4">Address</p>
              <div className=" border p-4 mb-4 rounded-md">{user?.address}</div>
              <p className="font-semibold mb-4">Phone Number</p>
              <div className=" border p-4 mb-4 rounded-md">
                {user?.phone_number}
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default ProfileUser;
