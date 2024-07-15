import { fetchSurveys } from '@/store/survey';
import Link from 'next/link';
import SurveyItem from '@/components/survey/surveyItem';
import SurveySkeleton from '@/components/survey/surveySkeleton';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';

const RecentPopularSurveys = () => {
  const { data: latestSurveys } = useSuspenseQuery({
    queryKey: ['survey'],
    queryFn: () => fetchSurveys('latest'),
  });

  const { data: popularSurveys } = useSuspenseQuery({
    queryKey: ['survey'],
    queryFn: () => fetchSurveys('popular'),
  });

  return (
    <section className="w-full px-4 md:px-8 2xl:px-0 flex justify-center py-16">
      <div className="w-full 2xl:w-[1400px]">
        <div className="flex flex-col md:flex-row gap-14 md:gap-8">
          <article className="flex-1">
            <div className="flex justify-between items-end mb-6">
              <h2 className="title2">새로 등록된 설문조사</h2>
              <Link href="/survey/all?sort=date-desc" className="caption">
                모든 설문 보기 →
              </Link>
            </div>
            <ul className="grid grid-cols-2 gap-4 md:gap-8">
              <Suspense
                fallback={
                  <>
                    <SurveySkeleton />
                    <SurveySkeleton />
                  </>
                }
              >
                {latestSurveys.map((item) => (
                  <SurveyItem key={item.id} item={item} />
                ))}
              </Suspense>
            </ul>
          </article>
          <article className="flex-1">
            <div className="flex justify-between items-end mb-6">
              <h2 className="title2">현재 인기가 많은 설문조사</h2>
              <Link href="/survey/all?sort=popular-asc" className="caption">
                모든 설문 보기 →
              </Link>
            </div>
            <ul className="grid grid-cols-2 gap-4 md:gap-8">
              <Suspense
                fallback={
                  <>
                    <SurveySkeleton />
                    <SurveySkeleton />
                  </>
                }
              >
                {popularSurveys.map((item) => (
                  <SurveyItem key={item.id} item={item} />
                ))}
              </Suspense>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
};

export default RecentPopularSurveys;
