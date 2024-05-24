import { Suspense } from 'react';
import { surveyData } from '@/firebase/db/surveyData';
import filterAndSortSurveyData from '@/utils/filterAndSortData';
import Link from 'next/link';
import RecruitItem from '@/components/recruit/recruitItem';
import RecruitSkeleton from '@/components/recruit/recruitSkeleton';

export default function Home() {
  // const filteredRecent = filterAndSortSurveyData(
  //   surveyData,
  //   () => true,
  //   (a, b) => new Date(b.id).getTime() - new Date(a.id).getTime(),
  // );

  // const filteredPopular = filterAndSortSurveyData(
  //   surveyData,
  //   () => true,
  //   (a, b) => {
  //     if (b.response !== a.response) {
  //       return b.response - a.response;
  //     } else if (b.comments.length !== a.comments.length) {
  //       return b.comments.length - a.comments.length;
  //     } else {
  //       return new Date(b.id).getTime() - new Date(a.id).getTime();
  //     }
  //   },
  // );

  return (
    <>
      <section className="bg-white w-full px-4 md:px-8 2xl:px-0 flex justify-center py-16 drop-shadow-sm">
        <div className="w-full 2xl:w-[1400px]">
          <div className="flex justify-between items-end mb-6">
            <h2>곧 마감되는 모집 공고를 살펴보세요</h2>
            <Link href="/" className="caption">
              모든 설문 보기 →
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
    </>
  );
}
