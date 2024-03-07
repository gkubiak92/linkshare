import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_LENGTH = 5;

export default function Loading() {
  return (
    <div className="flex items-start flex-col gap-4">
      <Skeleton className="h-[48px] w-[800px] max-w-full mb-8" />
      {Array.from({ length: SKELETON_LENGTH }).map((_, index) => (
        <Skeleton
          key={index}
          className="h-[225px] w-[800px] max-w-full rounded-xl"
        />
      ))}
    </div>
  );
}
