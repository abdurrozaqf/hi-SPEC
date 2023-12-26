import { Skeleton } from "./ui/skeleton";

interface Props {
  width: string;
  height: string;
  rounded?: string;
}

const CustomSkeleton = (props: Props) => {
  const { width, height, rounded } = props;
  return (
    <div>
      <Skeleton
        className={`${width} ${height} bg-[#E4ECF1] dark:bg-slate-700 rounded-${
          rounded ?? "full"
        }`}
      />
    </div>
  );
};

export default CustomSkeleton;
