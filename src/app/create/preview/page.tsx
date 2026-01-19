"use client";

import SurveyInfo from "@/components/create/surveyInfo";
import { Button } from "@/components/ui/button";
import CircularProgress from "@/components/ui/circular";
import questionComponentMap from "@/constants/questionComponentMap";
import { useSurveyStore } from "@/store/survey";
import { BroadcastChannel } from "broadcast-channel";
import { useCallback, useEffect, useRef, useState } from "react";

const loadStateFromLocalStorage = () => {
  const serializedState = localStorage.getItem("survey 1");
  if (serializedState === null) {
    return undefined;
  }
  return JSON.parse(serializedState);
};

const PreviewFormPage: React.FC = () => {
  const { surveyInfo, setSurveyInfo } = useSurveyStore();
  const [loading, setLoading] = useState(true);
  const broadcast = new BroadcastChannel("zustand_channel");
  const isMount = useRef(false);

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      const newState = event.data;
      if (JSON.stringify(newState) !== JSON.stringify(surveyInfo)) {
        setSurveyInfo(newState);
      }
    },
    [surveyInfo, setSurveyInfo],
  );

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
  }, [handleMessage, broadcast]);

  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true;
      return;
    }
    localStorage.setItem("survey 1", JSON.stringify(surveyInfo));
  }, [surveyInfo]);

  return (
    <div className="w-full flex-1 justify-center bg-green-light px-4 pt-8 pb-20 md:px-8 2xl:px-0">
      {loading ? (
        <div className="flex h-screen w-screen items-center justify-center" aria-live="polite">
          <CircularProgress aria-label="설문지를 로드하는 중입니다." />
        </div>
      ) : (
        <div className="m-auto flex w-full flex-col gap-5 2xl:w-[1400px]">
          <SurveyInfo mode="previewing" />
          {surveyInfo.questions.map((q) => {
            const QuestionComponent = questionComponentMap[q.type];
            return (
              <div
                key={q.id}
                className="overflow-hidden rounded-2xl bg-content p-5 shadow-md"
                aria-labelledby={`question-title-${q.id}`}
              >
                <div className="mb-2">
                  {q.isEssential && (
                    <span aria-hidden="true" className="mr-[3px] ml-[-12px] text-red">
                      *
                    </span>
                  )}
                  <span id={`question-title-${q.id}`} className="font-bold">
                    Q. {q.title || "(질문 없음)"}
                  </span>
                  <p id={`question-description-${q.id}`} className="caption">
                    {q.description || ""}
                  </p>
                </div>
                <QuestionComponent key={q.id} question={q} mode="testing" />
              </div>
            );
          })}
          <div className="flex" aria-label="폼 액션 버튼 그룹">
            <div className="flex-1" />
            <div className="flex-1 text-center">
              <Button className="bg-green-400 text-white" aria-label="폼 제출">
                제출
              </Button>
            </div>
            <div className="flex-1 text-end">
              <button
                type="button"
                className="rounded-md p-3 hover:bg-dark/5"
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
