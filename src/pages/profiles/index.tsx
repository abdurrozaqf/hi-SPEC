import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

import { useToken } from "@/utils/contexts/token";
const Profile = () => {
  const navigate = useNavigate();
  const { user } = useToken();

  return (
    <Layout>
      <div className="grow bg-white shadow-lg rounded-xl p-4 md:p-8 lg:p-24 font-poppins dark:bg-transparent overflow-auto">
        <h1 className=" mb-16 text-3xl lg:text-4xl font-bold">Profile</h1>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="flex items-center mb-10 md:mb-0">
            <img
              src={
                user.user?.avatar ||
                "https://mlsn40jruh7z.i.optimole.com/w:auto/h:auto/q:mauto/f:best/https://jeffjbutler.com//wp-content/uploads/2018/01/default-user.png"
              }
              alt={user.user?.name || "Guest"}
              className="object-cover rounded-full w-14 lg:w-36 h-14 lg:h-36 shadow-md border"
            />
            <p className="ml-4 md:ml-8 text-xl md:text-3xl font-bold truncate">
              {user.user?.name}
            </p>
          </div>
          <Button
            type="button"
            className="w-fit h-fit hover:bg-blue-800"
            onClick={() => navigate(`/profile-edit`)}
          >
            <p className="font-medium text-base">Edit Profile</p>
          </Button>
        </div>
        <div>
          <p className=" font-semibold mb-4 text-xl">Full Name</p>
          <div className="border rounded-md p-4 mb-4">{user.user?.name}</div>
          <p className=" font-semibold mb-4">Email</p>
          <div className="border p-4 mb-4 rounded-md">{user.user?.email}</div>
          <p className="font-semibold mb-4">Password</p>
          <div className=" border p-4 mb-4 rounded-md">**********</div>
          <p className=" font-semibold mb-4">Address</p>
          <div className=" border p-4 mb-4 rounded-md">
            {user.user?.address}
          </div>
          <p className="font-semibold mb-4">Phone Number</p>
          <div className=" border p-4 mb-4 rounded-md">
            {user.user?.phone_number}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
