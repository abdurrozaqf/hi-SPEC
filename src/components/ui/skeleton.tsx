import { cn } from "@/utils/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted bg-[#E4ECF1] dark:bg-slate-700 shadow-md",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
