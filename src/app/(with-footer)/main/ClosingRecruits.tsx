export const revalidate = 60 * 5;

import FormCardItem from "@/components/form/formCardItem";
import Skeleton from "@/components/form/formCardSkeleton";
import SectionHeader from "@/components/ui/sectionHeader";
import { fetchFormList } from "@/lib/firebase/form/getFormListServer";

const ClosingRecruits = async () => {
  const closingRecruits = await fetchFormList("recruit", "endingSoon");

  return (
    <section className="flex w-full justify-center bg-surface px-4 py-16 drop-shadow-sm md:px-8 2xl:px-0 dark:bg-muted">
      <div className="w-full 2xl:w-[1400px]">
        <SectionHeader title="곧 마감되는 모집 공고를 살펴보세요" linkHref="/recruit?cat=all" />
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
