import { Suspense } from 'react';
import { surveyData } from '@/mocks/surveyData';
import { filterAndSortSurveyData } from '@/utils/filterAndSortData';
import Link from 'next/link';
import CommentItem from '@/components/survey/commentItem';
import CommentSkeleton from '@/components/survey/commentSkeleton';

const LatestComments: React.FC = () => {
  const filteredComment = filterAndSortSurveyData(
    surveyData,
    (item) => item.comments.length > 0,
    (a, b) => {
      return (
        new Date(b.comments[b.comments.length - 1].createdDate).getTime() -
        new Date(a.comments[a.comments.length - 1].createdDate).getTime()
      );
    },
  ).slice(0, 4);

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
        ></Suspense>
        {surveyData.length > 0 && (
          <ul className="grid md:grid-cols-2 gap-4 md:gap-8 mb-8">
            {filteredComment.map((item) => (
              <CommentItem key={item.id} item={item} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default LatestComments;
