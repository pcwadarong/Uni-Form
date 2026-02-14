export const revalidate = 60 * 5;

import SectionHeader from "@/features/shared/ui/sectionHeader";
import CommentItem from "@/features/survey/form/components/commentCardItem";
import CommentSkeleton from "@/features/survey/form/components/commentSkeleton";
import { fetchLatestCommentsWithFormTitles } from "@/lib/firebase/form/getFormServer";

const LatestComments = async () => {
  const latestComments = await fetchLatestCommentsWithFormTitles();

  return (
    <section
      className="flex w-full justify-center bg-surface px-4 py-16 md:px-8 2xl:px-0 dark:bg-tone1"
      aria-labelledby="latest-comments-heading"
    >
      <div className="w-full 2xl:w-350">
        <SectionHeader
          title="최신 댓글이 달린 설문조사를 살펴보세요"
          linkHref="/survey?cat=all"
          headingId="latest-comments-heading"
        />
        <ul className="mb-8 grid gap-4 md:grid-cols-2 md:gap-8">
          {latestComments && latestComments.length > 0
            ? latestComments.map((item) => <CommentItem key={item.id} item={item} />)
            : Array.from({ length: 4 }).map((_, i) => (
                <li key={i}>
                  <CommentSkeleton />
                </li>
              ))}
        </ul>
      </div>
    </section>
  );
};

export default LatestComments;
