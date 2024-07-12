import { Suspense, useEffect } from 'react';
import Link from 'next/link';
import SurveyItem from '@/components/survey/surveyItem';
import SurveySkeleton from '@/components/survey/surveySkeleton';
import { useSurveys } from '@/store/survey';

const SpecialSurveys = () => {
  //const { publicSurveys, fetchSurveys } = usePublicSurveyStore();
  const { data: publicSurveys, isLoading, error, refetch } = useSurveys();

  useEffect(() => {
    refetch(); // 컴포넌트가 마운트될 때 데이터를 새로고침합니다.
  }, []);

  return (
    <section className="w-full px-4 md:px-8 2xl:px-0 flex justify-center py-16">
      <div className="w-full 2xl:w-[1400px]">
        <div className="flex justify-between items-end mb-6">
          <h2 className="title2">특별한 설문조사를 둘러보세요</h2>
          <Link href="/survey/all" className="caption">
            모든 설문 보기 →
          </Link>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <Suspense
            fallback={
              <>
                <SurveySkeleton />
                <SurveySkeleton />
                <SurveySkeleton />
                <SurveySkeleton />
              </>
            }
          >
            {publicSurveys.map((item) => (
              <SurveyItem key={item.id} item={item} />
            ))}
          </Suspense>
        </ul>
      </div>
    </section>
  );
};

export default SpecialSurveys;
