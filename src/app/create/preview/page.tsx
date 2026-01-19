"use client";

import CircularProgress from "@/features/shared/ui/circular";
import { PreviewContent } from "@/features/survey/create/components/PreviewContent";
import {
  useBroadcastSync,
  useLocalStorageSync,
} from "@/features/survey/create/hooks/usePreviewSync";
import { useSurveyStore } from "@/features/survey/create/store/survey";
import { useCallback } from "react";

/**
 * 설문 미리보기 페이지
 * BroadcastChannel 및 로컬 스토리지 동기화 처리, UI 컴포넌트에 데이터 전달
 */
export default function PreviewFormPage() {
  const { surveyInfo } = useSurveyStore();
  const isLoaded = useLocalStorageSync();
  useBroadcastSync();

  /**
   * 양식 지우기 핸들러
   */
  const handleClearForm = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <div className="w-full flex-1 justify-center bg-green-light px-4 pt-8 pb-20 md:px-8 2xl:px-0">
      {!isLoaded ? (
        <div className="flex h-screen w-screen items-center justify-center" aria-live="polite">
          <CircularProgress aria-label="설문지를 로드하는 중입니다." />
        </div>
      ) : (
        <PreviewContent questions={surveyInfo.questions} onClearForm={handleClearForm} />
      )}
    </div>
  );
}
