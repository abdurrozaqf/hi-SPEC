import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";

import { generatePagesToDisplay } from "@/utils/format-pagination";
import { Meta } from "@/utils/types/api";

import { Button } from "@/components/ui/button";

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
    <div className="flex justify-center items-center gap-8">
      <Button size="icon" disabled={meta?.page === 1} onClick={onClickPrevious}>
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {meta &&
        pagesToDisplay.map((page, index) => {
          return (
            <Button
              variant="outline"
              size="icon"
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
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
