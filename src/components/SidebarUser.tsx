import {
  BoxIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  GitCompareArrowsIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MoonStarIcon,
  SunIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { useTheme } from "@/utils/contexts/theme-provider";

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

interface Props {
  handleChange?: (event: any) => void;
}

const SidebarUser = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const { handleChange } = props;
  const navigate = useNavigate();

  const { setTheme, theme } = useTheme();
  function handleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="font-poppins">
      {/* SIDEBAR */}
      <div
        className={
          isOpen
            ? `h-full px-12 py-6 border-r relative flex flex-col justify-between shadow-md transition-all duration-300`
            : `h-full px-6 py-6 border-r relative flex flex-col justify-start shadow-md transition-all duration-300`
        }
      >
        {/* BUTTON SIDEBAR */}
        <div
          className={
            isOpen
              ? `p-2 bg-[#E4ECF1] dark:bg-[#1265AE] hover:bg-[#1265AE] hover:dark:bg-[#E4ECF1] hover:text-white hover:dark:text-black w-fit h-fit rounded-lg shadow-md cursor-pointer absolute right-4`
              : `p-2 bg-[#E4ECF1] dark:bg-[#1265AE] hover:bg-[#1265AE] hover:dark:bg-[#E4ECF1] hover:text-white hover:dark:text-black w-fit h-fit rounded-lg shadow-md cursor-pointer mb-10`
          }
          onClick={toggle}
        >
          {isOpen ? <ChevronFirstIcon /> : <ChevronLastIcon />}
        </div>

        {/* BUTTON MENU */}
        <div
          className={
            isOpen ? `flex flex-col gap-4` : `flex flex-col gap-4 grow`
          }
        >
          <div className="flex items-center gap-2">
            <div
              className="p-2 bg-[#E4ECF1] dark:bg-[#1265AE] hover:bg-[#1265AE] hover:dark:bg-[#E4ECF1] hover:text-white hover:dark:text-black w-fit h-fit rounded-lg shadow-md cursor-pointer"
              onClick={() => navigate("/")}
            >
              <HomeIcon />
            </div>
            <p
              className={
                isOpen
                  ? `w-40 font-medium translate-x-0 opacity-100 transition-all cursor-pointer hover:bg-[#E4ECF1] dark:hover:bg-white rounded-md p-2 dark:hover:text-black`
                  : `-translate-x-28 opacity-0 transition-all absolute`
              }
              onClick={() => navigate("/")}
            >
              Home
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="p-2 bg-[#E4ECF1] dark:bg-[#1265AE] hover:bg-[#1265AE] hover:dark:bg-[#E4ECF1] hover:text-white hover:dark:text-black w-fit h-fit rounded-lg shadow-md cursor-pointer"
              onClick={() => navigate("/products")}
            >
              <BoxIcon />
            </div>
            <p
              className={
                isOpen
                  ? `w-40 font-medium translate-x-0 opacity-100 transition-all cursor-pointer hover:bg-[#E4ECF1] dark:hover:bg-white rounded-md p-2 dark:hover:text-black`
                  : `-translate-x-28 opacity-0 transition-all absolute`
              }
              onClick={() => navigate("/products")}
            >
              Products
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="p-2 bg-[#E4ECF1] dark:bg-[#1265AE] hover:bg-[#1265AE] hover:dark:bg-[#E4ECF1] hover:text-white hover:dark:text-black w-fit h-fit rounded-lg shadow-md cursor-pointer"
              onClick={() => navigate("/compare")}
            >
              <GitCompareArrowsIcon />
            </div>
            <p
              onClick={() => navigate("/compare")}
              className={
                isOpen
                  ? `w-40 font-medium translate-x-0 opacity-100 transition-all cursor-pointer hover:bg-[#E4ECF1] dark:hover:bg-white rounded-md p-2 dark:hover:text-black`
                  : `-translate-x-28 opacity-0 transition-all absolute`
              }
            >
              Compare
            </p>
          </div>
        </div>

        {/* CATEGORIES */}
        <div
          className={
            isOpen
              ? `translate-x-0 w-fit flex flex-col gap-4 opacity-100 transition-all`
              : `-translate-x-36 w-0 opacity-50 transition-all hidden`
          }
        >
          <h1 className="font-medium">Categories:</h1>
          <div
            className="flex items-center gap-2 ml-4"
            onClick={() => navigate("/products")}
          >
            {/* <Checkbox id="all" value="" onChange={handleChange} /> */}
            <input
              onChange={handleChange}
              type="radio"
              value=""
              id="all"
              name="category"
              disabled={pathname == "/"}
              className="cursor-pointer"
            />
            <label
              htmlFor="all"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              All
            </label>
          </div>
          <div
            className="flex items-center gap-2 ml-4"
            onClick={() => navigate("/products")}
          >
            {/* <Checkbox id="office" value="office" onChange={handleChange} /> */}
            <input
              onChange={handleChange}
              type="radio"
              value="office"
              id="office"
              name="category"
              disabled={pathname == "/"}
              className="cursor-pointer"
            />
            <label
              htmlFor="office"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Office
            </label>
          </div>
          <div
            className="flex items-center gap-2 ml-4"
            onClick={() => navigate("/products")}
          >
            {/* <Checkbox id="multimedia" /> */}
            <input
              onChange={handleChange}
              type="radio"
              value="multimedia"
              id="multimedia"
              name="category"
              disabled={pathname == "/"}
              className="cursor-pointer"
            />
            <label
              htmlFor="multimedia"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Multimedia
            </label>
          </div>
          <div
            className="flex items-center gap-2 ml-4"
            onClick={() => navigate("/products")}
          >
            {/* <Checkbox id="gaming" /> */}
            <input
              onChange={handleChange}
              type="radio"
              value="gaming"
              id="gaming"
              name="category"
              disabled={pathname == "/"}
              className="cursor-pointer"
            />
            <label
              htmlFor="gaming"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Gaming
            </label>
          </div>
        </div>

        {/* RANGE ON BUDGET */}
        <div
          className={
            isOpen
              ? `translate-x-0 w-fit flex flex-col gap-4 opacity-100 transition-all`
              : `-translate-x-28 w-0 opacity-50 transition-all hidden`
          }
        >
          <h1 className="font-medium">Range on budget :</h1>
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
            <Button type="submit" className=" h-fit w-full bg-[#48B774] mt-6">
              <p className="font-medium">Submit</p>
            </Button>
          </form>
        </div>

        {/* USER */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <Avatar
              onClick={() => navigate("/profile")}
              className="cursor-pointer hover:shadow-[#1265AE] dark:shadow-white hover:shadow-lg rounded-full"
            >
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p
              onClick={() => navigate("/profile")}
              className={
                isOpen
                  ? `font-medium w-full opacity-100 translate-x-0 transition-all rounded-md p-2 hover:bg-[#E4ECF1]  hover:dark:bg-[#E4ECF1] dark:hover:text-black flex flex-col cursor-pointer`
                  : `w-0 opacity-0 -translate-x-28 transition-all absolute`
              }
            >
              <span>John Doe</span>
              <span className="text-xs">johndoe@mail.com</span>
            </p>
          </div>
          <div
            onClick={() => handleTheme()}
            className="flex items-center gap-2 cursor-pointer "
          >
            <div className="p-2 rounded-md shadow-md bg-[#E4ECF1] dark:bg-[#1265AE] hover:bg-[#1265AE] hover:dark:bg-[#E4ECF1] hover:text-white hover:dark:text-black">
              {theme === "light" ? <SunIcon /> : <MoonStarIcon />}
            </div>
            <p
              className={
                isOpen
                  ? `font-medium w-full opacity-100 translate-x-0 transition-all hover:bg-[#E4ECF1] dark:hover:bg-white rounded-md p-2 dark:hover:text-black`
                  : `w-0 opacity-0 -translate-x-28 transition-all absolute`
              }
            >
              Change Theme
            </p>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            <div className="p-2 rounded-md shadow-md w-fit bg-[#48B774]">
              <LogInIcon color="white" />
            </div>
            <p
              className={
                isOpen
                  ? `font-medium w-full opacity-100 translate-x-0 transition-all hover:bg-[#E4ECF1] dark:hover:bg-white rounded-md p-2 dark:hover:text-black`
                  : `w-0 opacity-0 -translate-x-28 transition-all absolute`
              }
            >
              Login
            </p>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            // onClick={() => changeToken()}
          >
            <div className="p-2 rounded-md shadow-md w-fit bg-[#FF5858]">
              <LogOutIcon color="white" />
            </div>

            <p
              className={
                isOpen
                  ? `font-medium w-full opacity-100 translate-x-0 transition-all hover:bg-[#E4ECF1] dark:hover:bg-white rounded-md p-2 dark:hover:text-black`
                  : `w-0 opacity-0 -translate-x-28 transition-all absolute`
              }
            >
              Logout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarUser;
