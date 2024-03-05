import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 min-h-full">
      <div className="flex flex-col justify-center items-center px-8 lg:px-0 max-w-full">
        <Skeleton className="h-[40px] w-[400px] max-w-full mb-16" />
        <Skeleton className="h-[600px] w-[400px] max-w-full" />
      </div>
      <div className="hidden md:block bg-primary" />
    </div>
  );
}
