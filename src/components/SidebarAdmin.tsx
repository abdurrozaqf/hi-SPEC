import { useLocation, useNavigate } from "react-router-dom";
import {
  ChevronFirstIcon,
  LayoutDashboard,
  ChevronLastIcon,
  MoonStarIcon,
  LogOutIcon,
  DollarSign,
  LogInIcon,
  SunIcon,
  BoxIcon,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import Alert from "@/components/AlertDialog";

import { useTheme } from "@/utils/contexts/theme-provider";
import { useSidebar } from "@/utils/contexts/sidebar";
import { useToken } from "@/utils/contexts/token";

import DefaultAvatar from "/images/default-avatar.png";

const SidebarAdmin = () => {
  const { changeToken, user, token } = useToken();
  const { sidebar, changeSidebar } = useSidebar();
  const { setTheme, theme } = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggle = () => changeSidebar(sidebar === "true" ? "false" : "true");

  function handleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  function handleLogout() {
    changeToken();
    changeSidebar();
    toast({
      description: "Logout Successfully",
    });
  }

  return (
    <div className="font-poppins">
      <div
        className={
          sidebar === "true"
            ? `h-full px-4 lg:px-12 py-3 lg:py-6 border-r relative flex flex-col justify-between shadow-md transition-all duration-300`
            : `h-full p-3 lg:p-6 border-r relative flex flex-col justify-start shadow-md transition-all duration-300`
        }
      >
        <div
          className={
            sidebar === "true"
              ? `p-2 bg-[#E4ECF1] dark:bg-[#1265AE] hover:bg-[#1265AE] hover:dark:bg-[#E4ECF1] hover:text-white hover:dark:text-black w-fit h-fit rounded-lg shadow-md cursor-pointer absolute right-2 lg:right-4 z-50`
              : `p-2 bg-[#E4ECF1] dark:bg-[#1265AE] hover:bg-[#1265AE] hover:dark:bg-[#E4ECF1] hover:text-white hover:dark:text-black w-fit h-fit rounded-lg shadow-md cursor-pointer mb-10`
          }
          onClick={toggle}
        >
          {sidebar === "true" ? <ChevronFirstIcon /> : <ChevronLastIcon />}
        </div>
        <div
          className={
            sidebar === "true"
              ? `flex flex-col gap-4`
              : `flex flex-col gap-4 grow`
          }
        >
          <div className="flex items-center gap-2">
            <div
              className={
                pathname === "/dashboard"
                  ? `p-2 dark:bg-[#E4ECF1] bg-[#1265AE] text-white dark:text-black w-fit h-fit rounded-lg shadow-md cursor-pointer`
                  : `p-2 bg-[#E4ECF1] dark:bg-[#1265AE] hover:bg-[#1265AE] hover:dark:bg-[#E4ECF1] hover:text-white hover:dark:text-black w-fit h-fit rounded-lg shadow-md cursor-pointer`
              }
              onClick={() => navigate("/dashboard")}
            >
              <LayoutDashboard />
            </div>
            <p
              className={
                sidebar === "true"
                  ? `w-32 font-medium translate-x-0 opacity-100 transition-all cursor-pointer hover:bg-[#E4ECF1] dark:hover:bg-white rounded-md p-2 dark:hover:text-black`
                  : `-translate-x-28 opacity-0 transition-all absolute`
              }
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={
                pathname === "/admin/products"
                  ? `p-2 dark:bg-[#E4ECF1] bg-[#1265AE] text-white dark:text-black w-fit h-fit rounded-lg shadow-md cursor-pointer`
                  : `p-2 bg-[#E4ECF1] dark:bg-[#1265AE] hover:bg-[#1265AE] hover:dark:bg-[#E4ECF1] hover:text-white hover:dark:text-black w-fit h-fit rounded-lg shadow-md cursor-pointer`
              }
              onClick={() => navigate("/admin/products")}
            >
              <BoxIcon />
            </div>
            <p
              className={
                sidebar === "true"
                  ? `w-32 font-medium translate-x-0 opacity-100 transition-all cursor-pointer hover:bg-[#E4ECF1] dark:hover:bg-white rounded-md p-2 dark:hover:text-black`
                  : `-translate-x-28 opacity-0 transition-all absolute`
              }
              onClick={() => navigate("/admin/products")}
            >
              Products
            </p>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <div
              className={
                pathname === "/admin/users"
                  ? `p-2 dark:bg-[#E4ECF1] bg-[#1265AE] text-white dark:text-black w-fit h-fit rounded-lg shadow-md cursor-pointer`
                  : `p-2 bg-[#E4ECF1] dark:bg-[#1265AE] hover:bg-[#1265AE] hover:dark:bg-[#E4ECF1] hover:text-white hover:dark:text-black w-fit h-fit rounded-lg shadow-md cursor-pointer`
              }
              onClick={() => navigate("/admin/users")}
            >
              <Users />
            </div>
            <p
              className={
                sidebar === "true"
                  ? `w-32 font-medium translate-x-0 opacity-100 transition-all cursor-pointer hover:bg-[#E4ECF1] dark:hover:bg-white rounded-md p-2 dark:hover:text-black`
                  : `-translate-x-28 opacity-0 transition-all absolute`
              }
              onClick={() => navigate("/admin/users")}
            >
              Users
            </p>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <div
              className={
                pathname === "/admin/transactions"
                  ? `p-2 dark:bg-[#E4ECF1] bg-[#1265AE] text-white dark:text-black w-fit h-fit rounded-lg shadow-md cursor-pointer`
                  : `p-2 bg-[#E4ECF1] dark:bg-[#1265AE] hover:bg-[#1265AE] hover:dark:bg-[#E4ECF1] hover:text-white hover:dark:text-black w-fit h-fit rounded-lg shadow-md cursor-pointer`
              }
              onClick={() => navigate("/admin/transactions")}
            >
              <DollarSign />
            </div>
            <p
              className={
                sidebar === "true"
                  ? `w-32 font-medium translate-x-0 opacity-100 transition-all cursor-pointer hover:bg-[#E4ECF1] dark:hover:bg-white rounded-md p-2 dark:hover:text-black`
                  : `-translate-x-28 opacity-0 transition-all absolute`
              }
              onClick={() => navigate("/admin/transactions")}
            >
              Transactions
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <Avatar
              onClick={() => navigate("/profile")}
              className="cursor-pointer shadow-md hover:shadow-[#1265AE] dark:shadow-white/50 hover:shadow-lg rounded-full"
            >
              <AvatarImage
                src={user.avatar || DefaultAvatar}
                alt={user?.name || "Guest"}
                loading="lazy"
                className="object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p
              onClick={() => navigate("/profile")}
              className={
                sidebar === "true"
                  ? `font-medium w-full opacity-100 translate-x-0 transition-all rounded-md p-2 hover:bg-[#E4ECF1]  hover:dark:bg-[#E4ECF1] dark:hover:text-black flex flex-col cursor-pointer`
                  : `w-0 opacity-50 -translate-x-28 transition-all absolute flex flex-col text-[0]`
              }
            >
              <span>{user?.name || "Guest"}</span>
              <span className={sidebar === "true" ? "text-xs" : `text-[0]`}>
                {user?.email || " guest@mail.com"}
              </span>
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
                sidebar === "true"
                  ? `font-medium w-full opacity-100 translate-x-0 transition-all hover:bg-[#E4ECF1] dark:hover:bg-white rounded-md p-2 dark:hover:text-black`
                  : `w-0 opacity-0 -translate-x-28 transition-all absolute`
              }
            >
              Change Theme
            </p>
          </div>
          {token ? (
            <Alert
              title="Are you sure for Logout"
              onAction={() => handleLogout()}
              onActionTitle="Logout"
            >
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="p-2 rounded-md shadow-md w-fit bg-[#FF5858]">
                  <LogOutIcon color="white" />
                </div>

                <p
                  className={
                    sidebar === "true"
                      ? `font-medium w-full text-start opacity-100 translate-x-0 transition-all hover:bg-[#E4ECF1] dark:hover:bg-white rounded-md p-2 dark:hover:text-black`
                      : `w-0 opacity-0 -translate-x-28 transition-all absolute`
                  }
                >
                  Logout
                </p>
              </div>
            </Alert>
          ) : (
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              <div className="p-2 rounded-md shadow-md w-fit bg-[#48B774]">
                <LogInIcon color="white" />
              </div>
              <p
                className={
                  sidebar === "true"
                    ? `font-medium w-full text-start opacity-100 translate-x-0 transition-all hover:bg-[#E4ECF1] dark:hover:bg-white rounded-md p-2 dark:hover:text-black`
                    : `w-0 opacity-0 -translate-x-28 transition-all absolute`
                }
              >
                Login
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarAdmin;
