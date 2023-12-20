import { useSearchParams } from "react-router-dom";
import { SearchCode } from "lucide-react";
import debounce from "lodash.debounce";

const SearchBox = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSearch(value: string) {
    if (value !== "") {
      searchParams.set("name", value);
      searchParams.delete("page");
    } else {
      searchParams.delete("name");
    }
    setSearchParams(searchParams);
  }

  const debounceHandle = debounce(
    (search: string) => handleSearch(search),
    500
  );

  return (
    <div className="bg-white rounded-full shadow-md p-2 w-1/2 ">
      <div className="flex gap-4 items-center">
        <SearchCode color="black" />
        <input
          type="search"
          onChange={(e) => debounceHandle(e.target.value)}
          placeholder="Search product by name"
          className="bg-transparent outline-none text-black text-sm w-full placeholder:italic placeholder:text-sm"
        />
      </div>
    </div>
  );
};

export default SearchBox;
