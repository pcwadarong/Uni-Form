'use client';

import SurveyInfo from '@/components/create/surveyInfo';
import CircularProgress from '@/components/ui/circular';
import questionComponentMap from '@/constants/questionComponentMap';
import { useSurveyStore } from '@/store/survey';
import { BroadcastChannel } from 'broadcast-channel';
import { useEffect, useRef, useState } from 'react';

const loadStateFromLocalStorage = () => {
  const serializedState = localStorage.getItem('survey 1');
  if (serializedState === null) {
    return undefined;
  }
  return JSON.parse(serializedState);
};

const PreviewFormPage: React.FC = () => {
  const { surveyInfo, setSurveyInfo } = useSurveyStore();
  const [loading, setLoading] = useState(true);
  const broadcast = new BroadcastChannel('zustand_channel');
  const isMount = useRef(false);

  const handleMessage = (event: MessageEvent) => {
    const newState = event.data;
    if (JSON.stringify(newState) !== JSON.stringify(surveyInfo)) {
      setSurveyInfo(newState);
    }
  };

  useEffect(() => {
    const storedState = loadStateFromLocalStorage();
    if (storedState) {
      setSurveyInfo(storedState);
    }
    setLoading(false);
  }, [setSurveyInfo]);

  useEffect(() => {
    broadcast.onmessage = handleMessage;

    return () => {
      broadcast.close();
    };
  }, [surveyInfo, setSurveyInfo, broadcast]);

  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true;
      return;
    }
    localStorage.setItem('survey 1', JSON.stringify(surveyInfo));
  }, [surveyInfo]);

  return (
    <div className="flex-1 w-full px-4 pt-8 pb-20 md:px-8 2xl:px-0 bg-green-light justify-center">
      {loading ? (
        <div
          className="flex w-screen h-screen justify-center items-center"
          role="status"
          aria-live="polite"
        >
          <CircularProgress aria-label="설문지를 로드하는 중입니다." />
        </div>
      ) : (
        <div className="w-full 2xl:w-[1400px] flex flex-col gap-5 m-auto">
          <SurveyInfo mode="previewing" />
          {surveyInfo.questions.map((q) => {
            const QuestionComponent = questionComponentMap[q.type];
            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md p-5"
                aria-labelledby={`question-title-${q.id}`}
              >
                <div className="mb-2">
                  {q.isEssential && (
                    <span
                      aria-hidden="true"
                      className="text-red ml-[-12px] mr-[3px]"
                    >
                      *
                    </span>
                  )}
                  <span id={`question-title-${q.id}`} className="font-bold">
                    Q. {q.title || '(질문 없음)'}
                  </span>
                  <p id={`question-description-${q.id}`} className="caption">
                    {q.description || ''}
                  </p>
                </div>
                <QuestionComponent key={q.id} question={q} mode="testing" />
              </div>
            );
          })}
          <div className="flex" role="group" aria-label="폼 액션 버튼 그룹">
            <div className="flex-1"></div>
            <div className="flex-1 text-center">
              <button
                className="py-3 px-8 bg-primary text-white rounded-md"
                aria-label="폼 제출"
              >
                제출
              </button>
            </div>
            <div className="flex-1 text-end">
              <button
                className="p-3 hover:bg-dark/5 rounded-md"
                onClick={() => {
                  window.location.reload();
                }}
                aria-label="양식 지우기"
              >
                양식 지우기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewFormPage;
