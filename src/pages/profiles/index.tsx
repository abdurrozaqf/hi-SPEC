import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

import { useToken } from "@/utils/contexts/token";
const Profile = () => {
  const navigate = useNavigate();
  const { user } = useToken();

  return (
    <Layout>
      <div className="grow bg-white shadow-lg rounded-xl p-32 font-poppins dark:bg-transparent overflow-auto">
        <h1 className=" mb-16 text-4xl font-bold">Profile</h1>
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center">
            <img
              src={
                user.user?.avatar ||
                "https://mlsn40jruh7z.i.optimole.com/w:auto/h:auto/q:mauto/f:best/https://jeffjbutler.com//wp-content/uploads/2018/01/default-user.png"
              }
              alt={user.user?.name || "Guest"}
              className="object-cover rounded-full w-36 h-36 shadow-md border"
            />
            <p className=" pl-8 text-3xl font-bold">{user.user?.name}</p>
          </div>
          <Button
            type="button"
            className="w-fit h-fit hover:bg-blue-800"
            onClick={() => navigate(`/edit-profile/${user.user?.user_id}`)}
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
