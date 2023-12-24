import { useSearchParams } from "react-router-dom";

interface Props {
  isOpen: string;
}

const CategoryBox = (props: Props) => {
  const { isOpen } = props;

  const [searchParams, setSearchParams] = useSearchParams();

  function handleCategory(value: string) {
    if (value !== "") {
      searchParams.set("category", value);
      searchParams.delete("page");
    } else {
      searchParams.delete("category");
    }
    setSearchParams(searchParams);
  }

  const category = searchParams.get("category");

  return (
    <div
      className={
        isOpen === "true"
          ? `translate-x-0 w-fit flex flex-col gap-4 opacity-100 transition-all`
          : `-translate-x-36 w-0 opacity-50 transition-all hidden`
      }
    >
      <h1 className="font-medium">Categories:</h1>
      <div className="flex ml-4 gap-2 items-center">
        <input
          onChange={(e) => handleCategory(e.target.value)}
          type="radio"
          value=""
          id="all"
          name="category"
          className="cursor-pointer"
        />
        <label
          htmlFor="all"
          className="cursor-pointer font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          All
        </label>
      </div>
      <div className="flex ml-4 gap-2 items-center">
        <input
          onChange={(e) => handleCategory(e.target.value)}
          type="radio"
          value="Office"
          id="office"
          name="category"
          checked={category === "Office"}
          className="cursor-pointer"
        />
        <label
          htmlFor="office"
          className="cursor-pointer font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Office
        </label>
      </div>
      <div className="flex ml-4 gap-2 items-center">
        <input
          onChange={(e) => handleCategory(e.target.value)}
          type="radio"
          value="Multimedia"
          id="multimedia"
          name="category"
          checked={category === "Multimedia"}
          className="cursor-pointer"
        />
        <label
          htmlFor="multimedia"
          className="cursor-pointer font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Multimedia
        </label>
      </div>
      <div className="flex ml-4 gap-2 items-center">
        <input
          onChange={(e) => handleCategory(e.target.value)}
          type="radio"
          value="Gaming"
          id="gaming"
          name="category"
          checked={category === "Gaming"}
          className="cursor-pointer"
        />
        <label
          htmlFor="gaming"
          className="cursor-pointer font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Gaming
        </label>
      </div>
    </div>
  );
};

export default CategoryBox;
