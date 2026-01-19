import { Skeleton } from "@/features/shared/ui/skeleton";

export default function CommentSkeleton() {
  return (
    <li className="flex h-24 flex-1 flex-col justify-around">
      <Skeleton className="h-10 rounded-md bg-gray-2" />
      <Skeleton className="h-6 w-3/4 rounded-md bg-gray-2" />
    </li>
  );
}
