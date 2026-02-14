import ToggleBtn from "@/features/shared/ui/toggleBtn";
import { useSurveyStore } from "@/features/survey/create/store/survey";
import { useCallback, useMemo } from "react";

interface Prop {
  id: number;
}

/**
 * 질문 옵션 컴포넌트
 * 질문 복사, 삭제, 필수 여부 토글 기능 제공
 * @param id - 질문 ID
 */
const Options: React.FC<Prop> = ({ id }) => {
  const { surveyInfo, setSurveyInfo } = useSurveyStore();
  const question = useMemo(
    () => surveyInfo.questions.find((item) => item.id === id),
    [surveyInfo.questions, id],
  );

  if (!question) {
    return null;
  }

  /**
   * 질문 복제 핸들러
   */
  const handleQuestionDuplicate = useCallback(() => {
    const newId = surveyInfo.questions.length
      ? Math.max(...surveyInfo.questions.map((q) => q.id)) + 1
      : 1;
    const timestamp = new Date().toISOString();
    const duplicatedQuestion = { ...question, id: newId, timestamp: timestamp };
    const updatedQuestions = [...surveyInfo.questions, duplicatedQuestion];
    setSurveyInfo({ questions: updatedQuestions });
  }, [surveyInfo.questions, question, setSurveyInfo]);

  /**
   * 질문 삭제 핸들러
   */
  const handleQuestionDelete = useCallback(() => {
    if (surveyInfo.questions.length > 1) {
      const updatedQuestions = surveyInfo.questions.filter((item) => item.id !== id);
      setSurveyInfo({ questions: updatedQuestions });
    }
  }, [surveyInfo.questions, id, setSurveyInfo]);

  /**
   * 필수 여부 토글 핸들러
   */
  const toggleIsEssential = useCallback(() => {
    const updatedQuestion = { ...question, isEssential: !question.isEssential };
    const updatedQuestions = surveyInfo.questions.map((q) => (q.id === id ? updatedQuestion : q));
    setSurveyInfo({ questions: updatedQuestions });
  }, [question, surveyInfo.questions, id, setSurveyInfo]);

  return (
    <div className="mt-4 flex justify-end items-center gap-2 border-gray-400 border-t pt-2">
      <button type="button" onClick={handleQuestionDuplicate} aria-label="질문 복사하기">
        복사
      </button>
      <button
        type="button"
        onClick={handleQuestionDelete}
        disabled={surveyInfo.questions.length === 1}
        aria-label="질문 삭제하기"
      >
        삭제
      </button>
      <ToggleBtn
        text="답변 필수"
        checked={question.isEssential}
        onChange={toggleIsEssential}
        aria-label="답변 필수 설정 토글"
      />
    </div>
  );
};

export default Options;
