import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import Alert from "@/components/AlertDialog";

import { useTheme } from "@/utils/contexts/theme-provider";
import { useToken } from "@/utils/contexts/token";

import {
  BoxIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  DollarSign,
  LayoutDashboard,
  LogInIcon,
  LogOutIcon,
  MoonStarIcon,
  SunIcon,
  Users,
} from "lucide-react";

const SidebarAdmin = () => {
  const { changeToken, changeUserID, user, token } = useToken();
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme, theme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggle = () => setIsOpen(!isOpen);

  function handleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  function handleLogout() {
    changeToken();
    changeUserID();
    toast({
      description: "Logout Successfully",
    });
  }

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
              onClick={() => navigate("/dashboard")}
            >
              <LayoutDashboard />
            </div>
            <p
              className={
                isOpen
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
              className="p-2 bg-[#E4ECF1] dark:bg-[#1265AE] hover:bg-[#1265AE] hover:dark:bg-[#E4ECF1] hover:text-white hover:dark:text-black w-fit h-fit rounded-lg shadow-md cursor-pointer"
              onClick={() => navigate("/products-admin")}
            >
              <BoxIcon />
            </div>
            <p
              className={
                isOpen
                  ? `w-32 font-medium translate-x-0 opacity-100 transition-all cursor-pointer hover:bg-[#E4ECF1] dark:hover:bg-white rounded-md p-2 dark:hover:text-black`
                  : `-translate-x-28 opacity-0 transition-all absolute`
              }
              onClick={() => navigate("/products-admin")}
            >
              Products
            </p>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <div
              className="p-2 bg-[#E4ECF1] dark:bg-[#1265AE] hover:bg-[#1265AE] hover:dark:bg-[#E4ECF1] hover:text-white hover:dark:text-black w-fit h-fit rounded-lg shadow-md cursor-pointer"
              onClick={() => navigate("/users-admin")}
            >
              <Users />
            </div>
            <p
              className={
                isOpen
                  ? `w-32 font-medium translate-x-0 opacity-100 transition-all cursor-pointer hover:bg-[#E4ECF1] dark:hover:bg-white rounded-md p-2 dark:hover:text-black`
                  : `-translate-x-28 opacity-0 transition-all absolute`
              }
              onClick={() => navigate("/users-admin")}
            >
              Users
            </p>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <div
              className="p-2 bg-[#E4ECF1] dark:bg-[#1265AE] hover:bg-[#1265AE] hover:dark:bg-[#E4ECF1] hover:text-white hover:dark:text-black w-fit h-fit rounded-lg shadow-md cursor-pointer"
              onClick={() => navigate("/transactions-admin")}
            >
              <DollarSign />
            </div>
            <p
              className={
                isOpen
                  ? `w-32 font-medium translate-x-0 opacity-100 transition-all cursor-pointer hover:bg-[#E4ECF1] dark:hover:bg-white rounded-md p-2 dark:hover:text-black`
                  : `-translate-x-28 opacity-0 transition-all absolute`
              }
              onClick={() => navigate("/transactions-admin")}
            >
              Transactions
            </p>
          </div>
        </div>

        {/* ADMIN */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <Avatar
              onClick={() => navigate("/profile")}
              className="cursor-pointer shadow-md hover:shadow-[#1265AE] dark:shadow-white/50 hover:shadow-lg rounded-full"
            >
              <AvatarImage
                src={
                  user.user?.avatar ||
                  "https://mlsn40jruh7z.i.optimole.com/w:auto/h:auto/q:mauto/f:best/https://jeffjbutler.com//wp-content/uploads/2018/01/default-user.png"
                }
                alt={user.user?.name || "Guest"}
                className="object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p
              onClick={() => navigate("/profile")}
              className={
                isOpen
                  ? `font-medium w-full opacity-100 translate-x-0 transition-all rounded-md p-2 hover:bg-[#E4ECF1]  hover:dark:bg-[#E4ECF1] dark:hover:text-black flex flex-col cursor-pointer`
                  : `w-0 opacity-50 -translate-x-52 transition-all absolute`
              }
            >
              <span>{user.user?.name || "Guest"}</span>
              <span className="text-xs">
                {user.user?.email || "guest@mail.com"}
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
                isOpen
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
                    isOpen
                      ? `font-medium w-full opacity-100 translate-x-0 transition-all hover:bg-[#E4ECF1] dark:hover:bg-white rounded-md p-2 dark:hover:text-black`
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
                  isOpen
                    ? `font-medium w-full opacity-100 translate-x-0 transition-all hover:bg-[#E4ECF1] dark:hover:bg-white rounded-md p-2 dark:hover:text-black`
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
