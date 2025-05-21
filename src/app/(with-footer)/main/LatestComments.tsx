export const revalidate = 60 * 5;

import CommentItem from "@/components/form/commentItem";
import CommentSkeleton from "@/components/form/commentSkeleton";
import { fetchFormList } from "@/lib/firebase/form/getListServer";
import Link from "next/link";

const LatestComments = async () => {
  const latestComments = await fetchFormList("survey", "recent");

  return (
    <section className="bg-surface dark:bg-muted w-full px-4 md:px-8 2xl:px-0 flex justify-center py-16">
      <div className="w-full 2xl:w-[1400px]">
        <div className="flex justify-between items-end mb-6">
          <h2 className="title2">최신 댓글을 살펴보세요</h2>
          <Link href="/survey/all" className="caption">
            모든 설문 보기 →
          </Link>
        </div>
        <ul className="grid md:grid-cols-2 gap-4 md:gap-8 mb-8">
          {latestComments.length > 0
            ? latestComments.map((item) => (
                <CommentItem key={item.id} item={item} />
              ))
            : Array.from({ length: 4 }).map((_, i) => <CommentSkeleton key={i} />)}
        </ul>
      </div>
    </section>
  );
};

export default LatestComments;
