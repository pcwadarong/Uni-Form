"use client";

import SVGIcon from "@/features/shared/icons/icons";
import Options from "@/features/survey/create/components/options";
import { useSurveyStore } from "@/features/survey/create/store/survey";
import type { QuestionProps } from "@/types";
import { useEffect, useState } from "react";

const StarRatingQuestion: React.FC<QuestionProps> = ({ question, mode }) => {
  const { updateQuestion } = useSurveyStore();
  const [comment, setComment] = useState("1~5");

  // 실제 유저가 선택한 별점 상태 (테스트/미리보기 모드용)
  const [rating, setRating] = useState(0);
  // 마우스 호버 시 보여줄 임시 별점 상태
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingStepChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const ratingStep = Number.parseFloat(e.target.value) as 0.5 | 1;
    updateQuestion(question.id, { ...question, ratingStep });
  };

  const handleRatingClick = (value: number) => {
    if (mode === "editing") return;
    setRating(value);
  };

  useEffect(() => {
    setComment(question.ratingStep === 1 ? "1~5" : "0.5~5");
  }, [question.ratingStep]);

  return (
    <>
      <div className={`mt-3 flex gap-3 ${mode === "editing" ? "items-center" : "flex-col"}`}>
        <div
          className="flex gap-1"
          role="radiogroup"
          aria-labelledby={`question-${question.id}-label`}
          onMouseLeave={() => setHoverRating(0)}
        >
          {(() => {
            const step = question.ratingStep ?? 1;
            const steps = Math.round(5 / step);
            return [...Array(steps)].map((_, i) => {
              // 현재 별이 채워져야 하는지 판단 (실제 점수 혹은 호버 점수 기준)
              const starValue = (i + 1) * step;
              const isActive = (hoverRating || rating) >= starValue;
              const inputId = `star-${question.id}-${starValue}`;

              return (
                <div key={i} className="relative">
                  <input
                    type="radio"
                    id={inputId}
                    name={`rating-${question.id}`}
                    value={starValue}
                    checked={rating === starValue}
                    onChange={() => handleRatingClick(starValue)}
                    className="sr-only"
                    disabled={mode === "editing"}
                  />

                  <label
                    htmlFor={inputId}
                    onMouseEnter={() => mode !== "editing" && setHoverRating(starValue)}
                    className={`block transition-transform duration-150 ${
                      mode !== "editing" ? "cursor-pointer hover:scale-110" : "cursor-default"
                    }`}
                    aria-label={`별 ${starValue}점`}
                  >
                    <SVGIcon
                      name="FilledStarIcon"
                      size={45}
                      className={isActive ? "text-green-400" : "text-gray-200"}
                      fill="currentColor"
                    />
                  </label>
                </div>
              );
            });
          })()}
        </div>

        <div className="ml-2 text-gray-4" id={`question-${question.id}-comment`}>
          {mode === "editing" ? (
            <div className="flex items-center">
              <label htmlFor={`rating-step-${question.id}`} className="mr-2 font-medium text-sm">
                단위 선택:
              </label>
              <select
                id={`rating-step-${question.id}`}
                className="rounded-lg border border-gray-2 p-1.5 text-sm focus:outline-none dark:bg-gray-900"
                value={question.ratingStep || 1}
                onChange={handleRatingStepChange}
              >
                <option value={0.5}>0.5</option>
                <option value={1}>1</option>
              </select>
              <span className="ml-2 text-gray-500 text-sm">단위</span>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              {rating > 0 ? `현재 선택: ${rating}점` : `${comment}점까지 선택이 가능합니다.`}
            </p>
          )}
        </div>
      </div>
      {mode === "editing" && <Options id={question.id} />}
    </>
  );
};

export default StarRatingQuestion;
