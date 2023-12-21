import { Link, useLocation } from "react-router-dom";
import { BookHeartIcon } from "lucide-react";

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
        {user.user?.name !== "admin" && (
          <Link to={token ? `/wishlist/${user.user?.user_id}` : `/`}>
            <div
              className={
                token
                  ? `p-2 lg:p-3 bg-white rounded-xl shadow-md visible`
                  : `invisible`
              }
            >
              <BookHeartIcon color="black" size={25} />
            </div>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
