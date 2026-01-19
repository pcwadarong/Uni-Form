"use client";

import questionComponentMap from "@/constants/questionComponentMap";
import { Button } from "@/features/shared/ui/button";
import CircularProgress from "@/features/shared/ui/circular";
import SurveyInfo from "@/features/survey/create/components/surveyInfo";
import { useSurveyStore } from "@/features/survey/create/store/survey";
import { BroadcastChannel } from "broadcast-channel";
import { useCallback, useEffect, useRef, useState } from "react";

const PreviewFormPage: React.FC = () => {
  const { surveyInfo, setSurveyInfo } = useSurveyStore();
  const [loading, setLoading] = useState(true);
  const broadcastRef = useRef<BroadcastChannel | null>(null);
  const isMount = useRef(false);

  // 1. 채널 초기화 및 해제
  useEffect(() => {
    broadcastRef.current = new BroadcastChannel("zustand_channel");
    return () => {
      broadcastRef.current?.close();
    };
  }, []);

  // 2. 메시지 핸들러 (메모이제이션)
  const handleMessage = useCallback(
    (event: any) => {
      const newState = event;
      if (JSON.stringify(newState) !== JSON.stringify(surveyInfo)) {
        setSurveyInfo(newState);
      }
    },
    [surveyInfo, setSurveyInfo],
  );

  // 3. 메시지 리스너 등록
  useEffect(() => {
    if (broadcastRef.current) {
      broadcastRef.current.onmessage = handleMessage;
    }
  }, [handleMessage]);

  // 4. 로컬 스토리지 로드 (최초 1회)
  useEffect(() => {
    const stored = localStorage.getItem("survey 1");
    if (stored) setSurveyInfo(JSON.parse(stored));
    setLoading(false);
  }, [setSurveyInfo]);

  // 5. 상태 변경 시 로컬 스토리지 저장
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
        <div className="m-auto flex w-full flex-col gap-5 2xl:w-350">
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
                    <span aria-hidden="true" className="-ml-3 mr-0.75 text-red">
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
