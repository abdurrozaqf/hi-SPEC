import { Meta } from "@/utils/types/api";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  meta?: Meta;
  onClickPrevious: () => void;
  onClickNext: () => void;
}

const Pagination = (props: Props) => {
  const { meta, onClickPrevious, onClickNext } = props;

  return (
    <div className="flex justify-center items-center gap-8">
      <Button size="icon" disabled={meta?.page === 1} onClick={onClickPrevious}>
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        size="icon"
        // disabled={meta?.page === meta?.totalPages}
        onClick={onClickNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
