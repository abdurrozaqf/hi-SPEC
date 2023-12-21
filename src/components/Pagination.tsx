import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";

import { generatePagesToDisplay } from "@/utils/formatter";
import { Meta } from "@/utils/types/api";

interface Props {
  meta?: Meta;
  onClickPrevious: () => void;
  onClickNext: () => void;
  onClickPage: (page: string | number) => void;
}

const Pagination = (props: Props) => {
  const { meta, onClickPrevious, onClickNext, onClickPage } = props;

  const pagesToDisplay = useMemo(
    () => generatePagesToDisplay(meta?.page!, meta?.total_page!),
    [meta]
  );

  return (
    <div className="flex justify-center items-center gap-2 md:gap-8">
      <Button
        size="icon"
        disabled={meta?.page === 1}
        onClick={onClickPrevious}
        className="hover:bg-[#1265AE] shadow-md text-white"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      {meta &&
        pagesToDisplay.map((page, index) => {
          return (
            <Button
              size="icon"
              variant="outline"
              key={`${page}-${index}`}
              disabled={meta?.page === page}
              onClick={() => onClickPage(page)}
            >
              {page}
            </Button>
          );
        })}

      <Button
        size="icon"
        disabled={meta?.page! === meta?.total_page || meta?.total_page === 0}
        onClick={onClickNext}
        className="hover:bg-[#1265AE] shadow-md text-white"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default Pagination;
