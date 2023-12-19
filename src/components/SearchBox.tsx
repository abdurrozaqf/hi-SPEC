import { FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { SearchCode } from "lucide-react";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (keyword !== "") {
      searchParams.set("name", keyword);
    } else {
      searchParams.delete("name");
    }
    setSearchParams(searchParams);
  }

  return (
    <div className="bg-white rounded-full shadow-md p-2 w-1/2 ">
      <form
        className="flex gap-4 items-center"
        onSubmit={(event) => onSubmit(event)}
      >
        <Button className="rounded-full h-fit bg-[#E4ECF1] w-fit p-1">
          <SearchCode color="black" />
        </Button>
        <input
          type="text"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="Enter your search name"
          className="bg-transparent outline-none text-black text-sm w-full placeholder:italic placeholder:text-sm"
        />
      </form>
    </div>
  );
};

export default SearchBox;
