import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import React from "react";

const Profile = () => {
  return (
    <Layout>
      <div className="grow bg-white shadow-lg rounded-xl overflow-auto p-32 font-poppins">
        <h1 className=" pb-16 text-4xl font-bold">Profile</h1>
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center">
            <img
              className=" rounded-full w-36 h-36"
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <p className=" pl-8 text-3xl font-bold">John Doe</p>
          </div>
          <Button className="w-40 h-14">
            <p className=" font-bold text-base">Edit Profile</p>
          </Button>
        </div>
        <div>
          <p className=" font-semibold mb-4 text-xl">Full Name</p>
          <div className="border rounded-md p-4 mb-4">John Doe</div>
          <p className=" font-semibold mb-4">Email</p>
          <div className="border p-4 mb-4 rounded-md">johndoe@gmail.com</div>
          <p className="font-semibold mb-4">Password</p>
          <div className=" border p-4 mb-4 rounded-md">**********</div>
          <p className=" font-semibold mb-4">Address</p>
          <div className=" border p-4 mb-4 rounded-md">
            Jl. Veteran, Kec. Lowokwaru, Kota Malang, Jawa Timur
          </div>
          <p className="font-semibold mb-4">Phone Number</p>
          <div className=" border p-4 mb-4 rounded-md">0819362731919</div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
