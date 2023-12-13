import { ReactNode } from "react";

import { Toaster } from "@/components/ui/toaster";
import Navbar from "./Navbar";

import SidebarUser from "@/components/SidebarUser";
import SidebarAdmin from "@/components/SidebarAdmin";

interface Props {
  children: ReactNode;
}

const Layout = (props: Readonly<Props>) => {
  const { children } = props;

  return (
    <div className="w-full h-screen flex flex-col font-inter transition-all overflow-auto">
      <Navbar />
      <div className="flex grow">
        <SidebarUser />
        {/* <SidebarAdmin /> */}

        {/* CONTENT */}
        <div className="grow overflow-auto flex flex-col p-6 bg-[#E4ECF1] dark:bg-transparent">
          {children}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Layout;
