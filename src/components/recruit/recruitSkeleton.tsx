import { Skeleton } from "../ui/skeleton";

export default function RecruitSkeleton() {
  return (
    <li className="flex flex-col flex-1 justify-between overflow-hidden h-[360px] rounded-3xl">
      <Skeleton className="h-48 bg-gray-2" />
      <div className="px-2 py-7 flex flex-col grow justify-between">
        <div>
          <Skeleton className="w-16 bg-gray-2 h-7 rounded-md" />
          <Skeleton className="bg-gray-2 h-10 rounded-xl mt-3" />
        </div>
        <Skeleton className="bg-gray-2 h-4 rounded-md w-3/4 mt-3 mb-2" />
      </div>
    </li>
  );
}
