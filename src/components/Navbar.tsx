import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { BookHeartIcon, SearchCode } from "lucide-react";

const Navbar = () => {
  const [keywords, setKeywords] = useState("");
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-[#1265AE] to-[#48B774]">
      <nav className="flex items-center justify-between px-[7.5rem] py-8 bg-navbar">
        <Link to="/">
          <h1 className="font-inter text-white">
            <span className="text-4xl font-bold">hi'</span>
            <span className="text-4xl font-black">SPEC</span>
          </h1>
        </Link>
        <div className="w-1/2 bg-white shadow-md rounded-full p-2 ">
          <form className="flex gap-4 items-center">
            <Button
              type="submit"
              disabled={keywords === ""}
              onClick={() => {
                navigate(`/list-products/${keywords}`);
              }}
              className="p-1 bg-[#E4ECF1] rounded-full w-fit h-fit"
            >
              <SearchCode color="black" />
            </Button>
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full italic placeholder:text-sm text-black outline-none bg-transparent text-sm"
            />
          </form>
        </div>
        <Link to="/my-wishlist">
          <div className="p-3 bg-white rounded-xl shadow-md">
            <BookHeartIcon color="black" size={30} />
          </div>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
