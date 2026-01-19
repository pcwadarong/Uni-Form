"use client";

import questionComponentMap from "@/constants/questionComponentMap";
import type { Question } from "@/features/survey/types";
import { memo } from "react";

interface PreviewQuestionListProps {
  questions: Question[];
}

/**
 * 미리보기 질문 목록 UI 컴포넌트
 * 질문 목록을 렌더링하는 순수 컴포넌트
 * @param questions - 표시할 질문 배열
 */
export const PreviewQuestionList = memo(function PreviewQuestionList({
  questions,
}: PreviewQuestionListProps) {
  return (
    <>
      {questions.map((q) => {
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
    </>
  );
});
