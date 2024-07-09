import ToggleBtn from '../common/toggleBtn';
import { useSurveyStore } from '@/store';

interface Prop {
  id: number;
}

const Options: React.FC<Prop> = ({ id }) => {
  const { surveyInfo, setSurveyInfo } = useSurveyStore();
  const question = surveyInfo.questions.find((item) => item.id === id);

  if (!question) {
    return null;
  }

  const handleQuestionDuplicate = () => {
    const newId = surveyInfo.questions.length
      ? Math.max(...surveyInfo.questions.map((q) => q.id)) + 1
      : 1;
    const duplicatedQuestion = { ...question, id: newId };
    const updatedQuestions = [...surveyInfo.questions, duplicatedQuestion];
    setSurveyInfo({ questions: updatedQuestions });
  };

  const handleQuestionDelete = () => {
    if (surveyInfo.questions.length > 1) {
      const updatedQuestions = surveyInfo.questions.filter((item) => item.id !== id);
      setSurveyInfo({ questions: updatedQuestions });
    }
  };

  const toggleIsEssential = () => {
    const updatedQuestion = { ...question, isEssential: !question.isEssential };
    const updatedQuestions = surveyInfo.questions.map((q) => (q.id === id ? updatedQuestion : q));
    setSurveyInfo({ questions: updatedQuestions });
  };

  return (
    <div className="flex gap-2 justify-end border-t-[1px] border-gray-2 pt-2 mt-4">
      <button onClick={handleQuestionDuplicate} aria-label="질문 복사하기">
        복사
      </button>
      <button
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
