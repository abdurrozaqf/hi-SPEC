import {
  BoxIcon,
  ChevronLastIcon,
  GitCompareArrowsIcon,
  HomeIcon,
  LogInIcon,
  MoonStarIcon,
  SunIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useTheme } from "@/utils/contexts/theme-provider";

const SidebarAdmin = () => {
  const { setTheme, theme } = useTheme();
  function handleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }
  return (
    <div className="font-poppins">
      {/* SIDEBAR */}
      <div className="h-full p-12 border-r relative flex flex-col justify-between shadow-md">
        {/* BUTTON SIDEBAR */}
        <div className="bg-[#E4ECF1] dark:bg-[#1265AE] shadow-md p-2 rounded-md absolute right-5 cursor-pointer">
          <ChevronLastIcon />
        </div>

        {/* BUTTON HOME */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="p-2 bg-[#E4ECF1] dark:bg-[#1265AE] w-fit h-fit rounded-lg shadow-md">
              <HomeIcon />
            </div>
            <p className="w-40 hover:bg-[#E4ECF1] dark:hover:bg-white rounded-md p-2 dark:hover:text-black">
              Home
            </p>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="p-2 bg-[#E4ECF1] dark:bg-[#1265AE] w-fit h-fit rounded-lg shadow-md">
              <BoxIcon />
            </div>
            <p className="w-40 hover:bg-[#E4ECF1] dark:hover:bg-white rounded-md p-2 dark:hover:text-black">
              Products
            </p>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="p-2 bg-[#E4ECF1] dark:bg-[#1265AE] w-fit h-fit rounded-lg shadow-md">
              <GitCompareArrowsIcon />
            </div>
            <p className="w-40 hover:bg-[#E4ECF1] dark:hover:bg-white rounded-md p-2 dark:hover:text-black">
              Compare
            </p>
          </div>
        </div>

        {/* ADMIN */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="font-medium flex flex-col">
              <span>Admin</span>
              <span className="text-xs">admin@mail.com</span>
            </p>
          </div>
          <div
            onClick={() => handleTheme()}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="p-2 rounded-md shadow-md w-fit dark:bg-[#1265AE] transition-opacity">
              {theme === "light" ? <SunIcon /> : <MoonStarIcon />}
            </div>
            <p className="w-full hover:bg-[#E4ECF1] dark:hover:bg-white rounded-md p-2 dark:hover:text-black">
              Change theme
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md shadow-md w-fit bg-[#48B774]">
              <LogInIcon color="white" />
            </div>
            <p>Login</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md shadow-md w-fit bg-[#FF5858]">
              <LogInIcon color="white" />
            </div>
            <p>Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarAdmin;
