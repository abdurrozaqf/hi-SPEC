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
import { Checkbox } from "@/components/ui/checkbox";

import { useTheme } from "@/utils/contexts/theme-provider";

const SidebarUser = () => {
  const { setTheme, theme } = useTheme();
  function handleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }
  return (
    <div>
      {/* SIDEBAR */}
      <div className="h-full p-10 border-r relative flex flex-col justify-between shadow-md">
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

        {/* CATEGORIES */}
        <div className="flex flex-col gap-4">
          <h1>Categories:</h1>
          <div className="flex items-center gap-2 ml-4">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Office
            </label>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Multimedia
            </label>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Gaming
            </label>
          </div>
        </div>

        {/* RANGE ON BUDGET */}
        <div className="flex flex-col gap-4">
          <h1>Range on budget :</h1>
          <form className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Rp. Minimum"
              className="rounded-md placeholder:text-sm outline-none dark:bg-black px-4 py-1 border shadow"
            />
            <p className="text-center">to</p>
            <input
              type="text"
              placeholder="Rp. Maximum"
              className="rounded-md placeholder:text-sm outline-none dark:bg-black px-4 py-1 border shadow"
            />
          </form>
        </div>

        {/* USER */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="font-medium flex flex-col">
              <span>John Doe</span>
              <span className="text-xs">johndoe@mail.com</span>
            </p>
          </div>
          <div
            onClick={() => handleTheme()}
            className="flex items-center gap-2 cursor-pointer "
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

export default SidebarUser;
