import { Suspense } from 'react';
import { surveyData } from '@/firebase/db/surveyData';
import Link from 'next/link';
import RecruitItem from '@/components/recruit/recruitItem';
import RecruitSkeleton from '@/components/recruit/recruitSkeleton';

const ClosingRecruits = () => {
  return (
    <section className="bg-white w-full px-4 md:px-8 2xl:px-0 flex justify-center py-16 drop-shadow-sm">
      <div className="w-full 2xl:w-[1400px]">
        <div className="flex justify-between items-end mb-6">
          <h2 className="title2">곧 마감되는 모집 공고를 살펴보세요</h2>
          <Link href="/recruit/all" className="caption">
            모든 공고 보기 →
          </Link>
        </div>
        <ul className="grid md:grid-cols-3 gap-4 md:gap-8">
          <Suspense
            fallback={
              <>
                <RecruitSkeleton />
                <RecruitSkeleton />
              </>
            }
          >
            {surveyData
              .sort(() => 0.5 - Math.random())
              .slice(0, 3)
              .map((item) => (
                <RecruitItem key={item.id} item={item} />
              ))}
          </Suspense>
        </ul>
      </div>
    </section>
  );
};

export default ClosingRecruits;
