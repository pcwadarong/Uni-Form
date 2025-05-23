export const revalidate = 60 * 5;

import FormCardItem from "@/components/form/formCardItem";
import Skeleton from "@/components/form/formCardSkeleton";
import { fetchFormList } from "@/lib/firebase/form/getFormListServer";
import Link from "next/link";

const ClosingRecruits = async () => {
  const closingRecruits = await fetchFormList("recruit", "endingSoon");

  return (
    <section className="flex w-full justify-center bg-surface px-4 py-16 drop-shadow-sm dark:bg-muted md:px-8 2xl:px-0">
      <div className="w-full 2xl:w-[1400px]">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="title2">곧 마감되는 모집 공고를 살펴보세요</h2>
          <Link href="/recruit?cat=all" className="caption">
            모든 공고 보기 →
          </Link>
        </div>
        <ul className="grid gap-4 md:grid-cols-3 md:gap-8">
          {closingRecruits.length > 0
            ? closingRecruits.map((item) => (
                <FormCardItem type="recruit" key={item.id} item={item} />
              ))
            : Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} type="recruit" />)}
        </ul>
      </div>
    </section>
  );
};

export default ClosingRecruits;
