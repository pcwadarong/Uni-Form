"use client";

import CircularProgress from "@/features/shared/ui/circular";
import SurveyInfo from "@/features/survey/create/components/surveyInfo";
import type { Question } from "@/features/survey/types";
import { memo } from "react";
import { PreviewActionButtons } from "./PreviewActionButtons";
import { PreviewQuestionList } from "./PreviewQuestionList";

interface PreviewContentProps {
  questions: Question[];
  onClearForm: () => void;
}

/**
 * 미리보기 콘텐츠 UI 컴포넌트
 * 설문 정보, 질문 목록, 액션 버튼을 렌더링
 * @param questions - 질문 배열
 * @param onClearForm - 양식 지우기 핸들러
 */
export const PreviewContent = memo(function PreviewContent({
  questions,
  onClearForm,
}: PreviewContentProps) {
  return (
    <div className="m-auto flex w-full flex-col gap-5 2xl:w-350">
      <SurveyInfo mode="previewing" />
      <PreviewQuestionList questions={questions} />
      <PreviewActionButtons onClearForm={onClearForm} />
    </div>
  );
});
