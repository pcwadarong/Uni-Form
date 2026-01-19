import { useSurveyStore } from "@/features/survey/create/store/survey";
import type { Question } from "@/features/survey/types";
import { useCallback, useMemo } from "react";

/**
 * 항목 추가 버튼 컴포넌트
 * 새 질문 또는 페이지 추가 기능 제공
 */
const AddBtns = () => {
  const { surveyInfo, setSurveyInfo } = useSurveyStore();

  /**
   * 기본 질문 데이터 생성
   */
  const basicData: Question = useMemo(
    () => ({
      id: surveyInfo.questions.length ? Math.max(...surveyInfo.questions.map((q) => q.id)) + 1 : 1,
      type: "checkbox",
      timestamp: new Date().toISOString(),
      title: "",
      isEssential: true,
      options: [
        { id: 1, value: "" },
        { id: 2, value: "" },
      ],
    }),
    [surveyInfo.questions],
  );

  /**
   * 질문 추가 핸들러
   */
  const addQuestion = useCallback(() => {
    const updatedQuestions = [...surveyInfo.questions, basicData];
    setSurveyInfo({ questions: updatedQuestions });
  }, [surveyInfo.questions, basicData, setSurveyInfo]);

  return (
    <div className="flex h-14 items-center border-gray-2 border-t">
      <button
        type="button"
        onClick={addQuestion}
        className="flex-1 border-gray-2 border-r"
        aria-label="항목 추가"
      >
        + 항목 추가
      </button>
      <button type="button" className="flex-1" aria-label="페이지 추가">
        + 페이지 추가
      </button>
    </div>
  );
};

export default AddBtns;
