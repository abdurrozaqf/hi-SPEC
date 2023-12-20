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
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [datas, setDatas] = useState<ComboboxDatas[]>([]);

  const getSuggestions = useCallback(async function (query: string) {
    if (!query) {
      return;
    }

    const result = await getProducts({ query } as Request);
    const newDatas =
      result.data?.map((data) => {
        return { name: data.name, product_id: data.product_id };
      }) ?? [];
    setDatas(newDatas);
  }, []);

  const getSuggestionsDebounce = useMemo(
    () => debounce(getSuggestions, 1000),
    [getSuggestions]
  );

  function onInputChange(newValue: string) {
    getSuggestionsDebounce(newValue);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[150px] justify-between md:w-[200px] lg:w-[300px]"
        >
          {value || placeholder}
          <ChevronsUpDown className="h-4 ml-2 opacity-50 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[150px] md:w-[200px] lg:w-[300px]">
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
