import { useNavigate, useSearchParams } from "react-router-dom";

interface Props {
  isOpen: boolean;
}

const CategoryBox = (props: Props) => {
  const { isOpen } = props;

  const navigate = useNavigate();
  const [category, setCategory] = useSearchParams();

  function handleCategory(e: any) {
    setCategory();
    setCategory({ category: e });
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
        className="flex items-center gap-2 ml-4"
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
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          All
        </label>
      </div>
      <div
        className="flex items-center gap-2 ml-4"
        onClick={() => navigate("/products")}
      >
        {/* <Checkbox id="office" value="office" onChange={handleChange} /> */}
        <input
          onChange={(e) => handleCategory(e.target.value)}
          type="radio"
          value="office"
          id="office"
          name="category"
          className="cursor-pointer"
        />
        <label
          htmlFor="office"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          Office
        </label>
      </div>
      <div
        className="flex items-center gap-2 ml-4"
        onClick={() => navigate("/products")}
      >
        {/* <Checkbox id="multimedia" /> */}
        <input
          onChange={(e) => handleCategory(e.target.value)}
          type="radio"
          value="multimedia"
          id="multimedia"
          name="category"
          className="cursor-pointer"
        />
        <label
          htmlFor="multimedia"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          Multimedia
        </label>
      </div>
      <div
        className="flex items-center gap-2 ml-4"
        onClick={() => navigate("/products")}
      >
        {/* <Checkbox id="gaming" /> */}
        <input
          onChange={(e) => handleCategory(e.target.value)}
          type="radio"
          value="gaming"
          id="gaming"
          name="category"
          className="cursor-pointer"
        />
        <label
          htmlFor="gaming"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          Gaming
        </label>
      </div>
    </div>
  );
};

export default CategoryBox;
