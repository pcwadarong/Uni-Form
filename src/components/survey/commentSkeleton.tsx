import { Skeleton } from "../ui/skeleton";

export default function CommentSkeleton() {
  return (
    <li className="flex flex-col flex-1 justify-around h-24">
      <Skeleton className="h-10 bg-gray-2 rounded-md" />
      <Skeleton className="h-6 bg-gray-2 rounded-md w-3/4" />
    </li>
  );
}
