import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="space-y-20 p-6">
      <div className="flex gap-4 flex-wrap">
        {[...Array(2)].map((_, index) => (
          <Skeleton key={`two-col-${index}`} className="h-32 w-[354px] grow md:shrink-0" />
        ))}
      </div>
      {[...Array(2)].map((_, sectionIndex) => (
        <div
          key={`three-col-section-${sectionIndex}`}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[...Array(3)].map((_, itemIndex) => (
            <Skeleton key={`three-col-${sectionIndex}-${itemIndex}`} className="h-32 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}
