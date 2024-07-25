'use client';

import { decrypt } from '@/utils/crypotoUtils';
import { usePathname } from 'next/navigation';
import SurveyInfo from '@/components/create/surveyInfo';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchDetail } from '@/firebase/fetchDatas';
import { useSurveyStore } from '@/store/survey';
import { useEffect } from 'react';
import Questions from '@/components/create/questions';
import Button from '@/components/common/button';

const ResponsePage = () => {
  const pathname = usePathname();
  const encryptedId = pathname.replace('/response/', '');
  const itemId = encryptedId ? decrypt(encryptedId) : '';
  const { surveyInfo, setSurveyInfo } = useSurveyStore();
  const type = itemId.startsWith('survey') ? 'surveys' : 'recruits';

  const { data: data } = useSuspenseQuery({
    queryKey: ['selectedSurveyDetail'],
    queryFn: () => fetchDetail(type, itemId),
  });

  useEffect(() => {
    if (data) {
      setSurveyInfo(data);
    }
  }, [data, setSurveyInfo]);

  const handleSaveResponse = () => {
    alert('saved');
  };

  return (
    <div className="flex-1 w-full px-4 pt-8 pb-20 md:px-8 2xl:px-0 bg-green-light justify-center">
      <div className="w-full 2xl:w-[1400px] flex flex-col gap-5 m-auto">
        <SurveyInfo mode="responding" />
        {surveyInfo.questions.length > 0 &&
          surveyInfo.questions.map((question) => (
            <Questions
              key={question.timestamp}
              question={question}
              isEssential={question.isEssential}
              mode="responding"
            />
          ))}
        <Button
          text={'제출하기'}
          className={'text-white bg-primary'}
          onClick={handleSaveResponse}
        />
      </div>
    </div>
  );
};

export default ResponsePage;
