import { useSearchParams } from "react-router-dom";

import { Checkbox } from "@/components/ui/checkbox";

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
          id="all"
          value=""
          type="checkbox"
          checked={!category}
          onChange={(e) => handleCategory(e.target.value)}
          className="hidden"
        />
        <Checkbox
          id="all"
          checked={!category}
          className="bg-[#E4ECF1] w-4 h-4 border-black/25"
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
          id="office"
          type="checkbox"
          value="Office"
          checked={category === "Office"}
          className="hidden"
        />
        <Checkbox
          id="office"
          checked={category === "Office"}
          className="bg-[#E4ECF1] w-4 h-4 border-black/25"
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
          id="multimedia"
          type="checkbox"
          value="Multimedia"
          checked={category === "Multimedia"}
          className="hidden"
        />
        <Checkbox
          id="multimedia"
          checked={category === "Multimedia"}
          className="bg-[#E4ECF1] w-4 h-4 border-black/25"
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
          id="gaming"
          type="checkbox"
          value="Gaming"
          checked={category === "Gaming"}
          className="hidden"
        />
        <Checkbox
          id="gaming"
          checked={category === "Gaming"}
          className="bg-[#E4ECF1] w-4 h-4 border-black/25"
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
