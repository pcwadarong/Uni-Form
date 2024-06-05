import ToggleBtn from '../common/toggleBtn';
import { useSurveyStore } from '@/store';

interface Prop {
  id: number;
}

const Options: React.FC<Prop> = ({ id, isEssential }) => {
  const { questions, setQuestions, updateQuestion } = useSurveyStore();
  const question = questions.find((item) => item.id === id);

  if (!question) {
    return null;
  }

  const handleQuestionDuplicate = () => {
    const newId = questions.length ? Math.max(...questions.map((q) => q.id)) + 1 : 1;
    const duplicatedQuestion = { ...question, id: newId };
    setQuestions([...questions, duplicatedQuestion]);
  };

  const handleQuestionDelete = () => {
    if (questions.length > 1) {
      setQuestions(questions.filter((item) => item.id !== id));
    }
  };

  const toggleIsEssential = () => {
    updateQuestion(id, { ...question, isEssential: !question.isEssential });
  };

  return (
    <div className="flex gap-2 justify-end border-t-[1px] border-gray-2 pt-2 mt-4">
      <button onClick={handleQuestionDuplicate}>복사</button>
      <button onClick={handleQuestionDelete} disabled={questions.length === 1}>삭제</button>
      <ToggleBtn text="답변 필수" checked={question.isEssential} onChange={toggleIsEssential} />
    </div>
  );
};

export default Options;
