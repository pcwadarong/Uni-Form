'use client';

import { useSurveyStore } from '@/store';
import SurveyInfo from '@/components/create/surveyInfo';
import questionComponentMap from '@/constants/questionComponentMap';

const PreviewFormPage: React.FC = () => {
  const { surveyInfo } = useSurveyStore();

  return (
    <div className="flex w-full h-full py-8 pb-20 md:px-8 2xl:px-0 bg-green-light justify-center">
      <div className="w-full 2xl:w-[1400px] flex flex-col gap-5">
        <SurveyInfo mode="previewing" />
        
        {surveyInfo.questions.map((q) => {
          const QuestionComponent = questionComponentMap[q.type];
          return (
            <div key={q.id} className={'bg-white rounded-2xl overflow-hidden shadow-md p-4'}>
              <p className="font-bold">Q. {q.title || '(질문 없음)'}</p>
              <p className="caption">{q.description || ''}</p>
              <QuestionComponent key={q.id} question={q} mode="testing" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PreviewFormPage;
