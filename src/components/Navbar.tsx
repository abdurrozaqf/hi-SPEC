import { Link, useLocation } from "react-router-dom";

import SearchBox from "@/components/SearchBox";

import { BookHeartIcon } from "lucide-react";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <header className="bg-gradient-to-r from-[#1265AE] to-[#48B774]">
      <nav className="flex items-center justify-between px-[7.5rem] py-8 bg-[url('src/assets/icons-navbar.svg')] bg-cover bg-no-repeat bg-center">
        <Link to="/">
          <h1 className="font-inter text-white">
            <span className="text-4xl font-bold">hi'</span>
            <span className="text-4xl font-black">SPEC</span>
          </h1>
        </Link>
        {pathname === "/products" && <SearchBox />}
        <Link to="/wishlist">
          <div className="p-3 bg-white rounded-xl shadow-md">
            <BookHeartIcon color="black" size={30} />
          </div>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
