import { useCallback, useState, useMemo } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import debounce from "lodash.debounce";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { getProducts } from "@/utils/apis/products";
import { Request } from "@/utils/types/api";
import { cn } from "@/utils/utils";

interface ComboboxDatas {
  product_id: number;
  name: string;
}

interface ComboboxProps {
  placeholder?: string;
  onSelectProduct: (id: number) => void;
}

const SearchCompareBox = ({
  placeholder = "Search...",
  onSelectProduct,
}: ComboboxProps) => {
  const [datas, setDatas] = useState<ComboboxDatas[]>([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const getSuggestions = useCallback(async function (query: string) {
    if (!query) {
      return;
    }

    const result = await getProducts({ name: query } as Request);
    const newDatas =
      result.data?.map((data) => {
        return { name: data.name, product_id: data.product_id };
      }) ?? [];
    setDatas(newDatas);
  }, []);

  const getSuggestionsDebounce = useMemo(
    () => debounce(getSuggestions, 250),
    [getSuggestions]
  );

  function onInputChange(newValue: string) {
    getSuggestionsDebounce(newValue);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className="w-full max-w-[190px] md:max-w-[230px] lg:max-w-[280px] xl:max-w-[400px]"
      >
        <Button
          variant="outline"
          role="combobox"
          aria-label="Search Products"
          aria-expanded={open}
          className="flex justify-between bg-white dark:bg-black/25"
        >
          <p className="truncate">{value || placeholder}</p>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-[190px] md:max-w-[230px] lg:max-w-[280px] xl:max-w-[400px] p-0">
        <Command>
          <CommandInput
            placeholder={placeholder}
            onValueChange={onInputChange}
          />
          <CommandEmpty>No products found.</CommandEmpty>
          <CommandGroup>
            {datas.map((data) => (
              <CommandItem
                key={data.product_id}
                value={data.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setDatas([]);
                  setOpen(false);
                  onSelectProduct(data.product_id);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === data.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {data.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchCompareBox;
