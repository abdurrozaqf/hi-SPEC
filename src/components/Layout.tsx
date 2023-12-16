import { useLocation } from "react-router-dom";
import { ReactNode } from "react";

import SidebarAdmin from "@/components/SidebarAdmin";
import SidebarUser from "@/components/SidebarUser";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";

interface Props {
  children: ReactNode;
}

const Layout = (props: Readonly<Props>) => {
  const { children } = props;
  const { pathname } = useLocation();

  return (
    <div className="w-full h-screen flex flex-col font-inter transition-all overflow-auto">
      <Navbar />
      <div className="flex grow overflow-auto">
        {pathname === "/detail-product" ? undefined : <SidebarUser />}
        {/* <SidebarAdmin /> */}

        {/* CONTENT */}
        <div className="flex flex-1 flex-col p-6 bg-[#E4ECF1] dark:bg-transparent overflow-auto">
          {children}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Layout;
