'use client';

import { Suspense } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchSurveysOrRecruitsList } from '@/firebase/fetchDatas';
import { Survey, Recruit } from '@/types';
import RecruitItem from '../recruit/recruitItem';
import SurveyItem from '@/components/survey/surveyItem';
import SurveySkeleton from '@/components/survey/surveySkeleton';
import RecruitSkeleton from '../recruit/recruitSkeleton';
import NoContent from './noContent';

interface Props {
  query: string;
  topic: 'survey' | 'recruit';
}

const SearchedList: React.FC<Props> = ({ topic, query }) => {
  const { data: dataList } = useSuspenseQuery({
    queryKey: ['datalist', { type: topic }],
    queryFn: () => fetchSurveysOrRecruitsList(topic, 'public'),
  });

  const filteredList = dataList.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <section className="2xl:flex w-full 2xl:w-[1400px] gap-10 my-20 px-4 2xl:px-0">
        <div className="grow">
          {filteredList.length === 0 ? (
            <NoContent />
          ) : (
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <Suspense
                fallback={
                  topic === 'survey' ? (
                    <>
                      <SurveySkeleton />
                      <SurveySkeleton />
                      <SurveySkeleton />
                      <SurveySkeleton />
                    </>
                  ) : (
                    <>
                      <RecruitSkeleton />
                      <RecruitSkeleton />
                      <RecruitSkeleton />
                      <RecruitSkeleton />
                    </>
                  )
                }
              >
                {filteredList.map((item) =>
                  topic === 'survey' ? (
                    <SurveyItem key={item.id} item={item as Survey} />
                  ) : (
                    <RecruitItem key={item.id} item={item as Recruit} />
                  ),
                )}
              </Suspense>
            </ul>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchedList;
