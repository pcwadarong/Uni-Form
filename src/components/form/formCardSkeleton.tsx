import { Skeleton } from "../ui/skeleton";

interface FormCardSkeletonProps {
  type: "survey" | "recruit";
}

export default function FormCardSkeleton({ type }: FormCardSkeletonProps) {
  const isSurvey = type === "survey";

  return (
    <li className="flex h-[360px] flex-1 flex-col justify-between overflow-hidden rounded-3xl">
      <Skeleton className={isSurvey ? "h-36 bg-gray-2" : "h-48 bg-gray-2"} />
      <div className="flex grow flex-col justify-between px-2 py-7">
        <div>
          {isSurvey ? (
            <div className="flex h-7 gap-2">
              <Skeleton className="h-full w-16 rounded-md bg-gray-2" />
              <Skeleton className="h-full w-12 rounded-md bg-gray-2" />
            </div>
          ) : (
            <Skeleton className="h-7 w-16 rounded-md bg-gray-2" />
          )}
          <Skeleton className="mt-3 mb-2 h-10 rounded-xl bg-gray-2" />
          <Skeleton className="mt-3 mb-2 h-4 w-3/4 rounded-md bg-gray-2" />
        </div>
        {isSurvey && (
          <div className="flex gap-2">
            <Skeleton className="h-7 w-1/3 rounded-md bg-gray-2" />
            <Skeleton className="h-7 w-1/3 rounded-md bg-gray-2" />
          </div>
        )}
      </div>
    </li>
  );
}
