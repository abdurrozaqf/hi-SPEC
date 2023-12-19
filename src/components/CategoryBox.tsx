import { useNavigate, useSearchParams } from "react-router-dom";

interface Props {
  isOpen: boolean;
}

const CategoryBox = (props: Props) => {
  const { isOpen } = props;

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleCategory(value: string) {
    if (value !== "") {
      searchParams.set("category", value);
    } else {
      searchParams.delete("category");
    }
    setSearchParams(searchParams);
  }

  return (
    <div
      className={
        isOpen
          ? `translate-x-0 w-fit flex flex-col gap-4 opacity-100 transition-all`
          : `-translate-x-36 w-0 opacity-50 transition-all hidden`
      }
    >
      <h1 className="font-medium">Categories:</h1>
      <div
        className="flex ml-4 gap-2 items-center"
        onClick={() => navigate("/products")}
      >
        {/* <Checkbox id="all" value="" onChange={handleChange} /> */}
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
      <div
        className="flex ml-4 gap-2 items-center"
        onClick={() => navigate("/products")}
      >
        {/* <Checkbox id="office" value="office" onChange={handleChange} /> */}
        <input
          onChange={(e) => handleCategory(e.target.value)}
          type="radio"
          value="Office"
          id="office"
          name="category"
          className="cursor-pointer"
        />
        <label
          htmlFor="office"
          className="cursor-pointer font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Office
        </label>
      </div>
      <div
        className="flex ml-4 gap-2 items-center"
        onClick={() => navigate("/products")}
      >
        {/* <Checkbox id="multimedia" /> */}
        <input
          onChange={(e) => handleCategory(e.target.value)}
          type="radio"
          value="Multimedia"
          id="multimedia"
          name="category"
          className="cursor-pointer"
        />
        <label
          htmlFor="multimedia"
          className="cursor-pointer font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Multimedia
        </label>
      </div>
      <div
        className="flex ml-4 gap-2 items-center"
        onClick={() => navigate("/products")}
      >
        {/* <Checkbox id="gaming" /> */}
        <input
          onChange={(e) => handleCategory(e.target.value)}
          type="radio"
          value="Gaming"
          id="gaming"
          name="category"
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
