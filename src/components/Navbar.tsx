import { Link, useLocation } from "react-router-dom";
import { BookHeartIcon, NewspaperIcon } from "lucide-react";

import SearchBox from "@/components/SearchBox";

import { useToken } from "@/utils/contexts/token";

const Navbar = () => {
  const { pathname } = useLocation();
  const { token, user } = useToken();

  return (
    <header className="bg-gradient-to-r from-[#1265AE] to-[#48B774]">
      <nav className="flex items-center justify-between px-4 lg:px-[7.5rem] py-4 background-navbar">
        <Link to="/">
          <h1 className="font-inter text-white">
            <span className="text-2xl md:text-4xl font-bold">hi'</span>
            <span className="text-2xl md:text-4xl font-black">SPEC</span>
          </h1>
        </Link>

        {pathname === "/products" ? (
          <SearchBox />
        ) : pathname === "/categories/office" ? (
          <SearchBox />
        ) : pathname === "/categories/gaming" ? (
          <SearchBox />
        ) : pathname === "/categories/multimedia" ? (
          <SearchBox />
        ) : undefined}

        {user.role !== "admin" && (
          <div className=" flex items-center gap-6">
            <Link to={token ? `/wishlist` : `/`}>
              <div
                className={
                  token
                    ? `p-2 lg:p-3 rounded-xl shadow-md visible bg-[#E4ECF1] dark:bg-[#1265AE] hover:bg-[#1265AE] hover:dark:bg-[#E4ECF1] text-black dark:text-white hover:text-white hover:dark:text-black`
                    : `invisible`
                }
              >
                <BookHeartIcon size={25} />
              </div>
            </Link>
            <Link to={token ? `/transaction` : `/`}>
              <div
                className={
                  token
                    ? `p-2 lg:p-3 rounded-xl shadow-md visible bg-[#E4ECF1] dark:bg-[#1265AE] hover:bg-[#1265AE] hover:dark:bg-[#E4ECF1] text-black dark:text-white hover:text-white hover:dark:text-black`
                    : `invisible`
                }
              >
                <NewspaperIcon size={25} />
              </div>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
