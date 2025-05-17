'use client';

import CommentItem from "@/components/survey/commentItem";
import CommentSkeleton from "@/components/survey/commentSkeleton";
import { fetchSurveysOrRecruitsList } from "@/lib/firebase/fetchDatas";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Suspense } from "react";

const LatestComments: React.FC = () => {
  const { data: latestComments } = useSuspenseQuery({
    queryKey: ["latestComments"],
    queryFn: () => fetchSurveysOrRecruitsList("survey", "latestComments"),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section className="bg-white w-full px-4 md:px-8 2xl:px-0 flex justify-center py-16">
      <div className="w-full 2xl:w-[1400px]">
        <div className="flex justify-between items-end mb-6">
          <h2 className="title2">최신 댓글을 살펴보세요</h2>
          <Link href="/survey/all" className="caption">
            모든 설문 보기 →
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-8">
              <CommentSkeleton />
              <CommentSkeleton />
              <CommentSkeleton />
              <CommentSkeleton />
            </div>
          }
        >
          <ul className="grid md:grid-cols-2 gap-4 md:gap-8 mb-8">
            {latestComments.map((item) => (
              <CommentItem key={item.id} item={item} />
            ))}
          </ul>
        </Suspense>
      </div>
    </section>
  );
};

export default LatestComments;
