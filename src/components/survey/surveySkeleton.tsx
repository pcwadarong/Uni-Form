import { Skeleton } from '../ui/skeleton';

export default function SurveySkeleton() {
  return (
    <li className="flex flex-col flex-1 justify-between overflow-hidden h-[360px] rounded-3xl">
      <Skeleton className="h-36 bg-gray-2" />
      <div className="px-2 py-7 flex flex-col grow justify-between">
        <div>
          <div className="flex gap-2 h-7">
            <Skeleton className="w-16 h-full bg-gray-2 rounded-md" />
            <Skeleton className="w-12 h-full bg-gray-2 rounded-md" />
          </div>
          <Skeleton className="bg-gray-2 h-10 rounded-xl mt-3 mb-2" />
          <Skeleton className="bg-gray-2 h-4 rounded-md w-3/4 mt-3 mb-2" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="w-1/3 bg-gray-2 h-7 rounded-md" />
          <Skeleton className="w-1/3 bg-gray-2 h-7 rounded-md" />
        </div>
      </div>
    </li>
  );
}
