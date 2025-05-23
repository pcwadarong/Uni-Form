export const revalidate = 60 * 5;

import CommentItem from "@/components/form/commentCardItem";
import CommentSkeleton from "@/components/form/commentSkeleton";
import { fetchLatestCommentsWithFormTitles } from "@/lib/firebase/form/getServer";
import Link from "next/link";

const LatestComments = async () => {
  const latestComments = await fetchLatestCommentsWithFormTitles();

  return (
    <section
      className="w-full bg-surface dark:bg-muted px-4 py-16 flex justify-center md:px-8 2xl:px-0"
      aria-labelledby="latest-comments-heading"
    >
      <div className="w-full 2xl:w-[1400px]">
        <div className="mb-6 flex items-end justify-between">
          <h2 id="latest-comments-heading" className="title2">
            최신 댓글이 달린 설문조사를 살펴보세요
          </h2>
          <Link href="/survey?cat=all" className="caption">
            모든 설문 보기 →
          </Link>
        </div>
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
