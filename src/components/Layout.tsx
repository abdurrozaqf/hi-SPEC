import { ReactNode } from "react";

import SidebarAdmin from "@/components/SidebarAdmin";
import SidebarUser from "@/components/SidebarUser";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";

import { useToken } from "@/utils/contexts/token";

interface Props {
  children: ReactNode;
}

const Layout = (props: Readonly<Props>) => {
  const { children } = props;
  const { token, user } = useToken();

  return (
    <div className="w-full h-screen flex flex-col font-inter transition-all overflow-auto">
      <Navbar />
      <div className="flex grow overflow-auto">
        {token && user.user?.name === "admin" ? (
          <SidebarAdmin />
        ) : user.user?.name !== "admin" ? (
          <SidebarUser />
        ) : undefined}

        <div className="flex flex-1 flex-col p-6 bg-[#E4ECF1] dark:bg-transparent overflow-auto">
          {children}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Layout;
