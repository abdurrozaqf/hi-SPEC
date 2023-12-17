import { FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { SearchCode } from "lucide-react";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useSearchParams();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearch({ name: keyword });
  }

  return (
    <div className="w-1/2 bg-white shadow-md rounded-full p-2 ">
      <form
        className="flex gap-4 items-center"
        onSubmit={(event) => onSubmit(event)}
      >
        <Button className="p-1 bg-[#E4ECF1] rounded-full w-fit h-fit">
          <SearchCode color="black" />
        </Button>
        <input
          type="text"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="Enter your search name"
          className="w-full placeholder:italic placeholder:text-sm text-black outline-none bg-transparent text-sm"
        />
      </form>
    </div>
  );
};

export default SearchBox;
