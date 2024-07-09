import { useSurveyStore } from '@/store';
import { Question } from '@/types';

const AddBtns = () => {
  const { surveyInfo, setSurveyInfo } = useSurveyStore();

  const basicData: Question = {
    id: surveyInfo.questions.length ? Math.max(...surveyInfo.questions.map((q) => q.id)) + 1 : 1,
    type: 'checkbox',
    title: '',
    options: [
      { id: 1, value: '항목 1' },
      { id: 2, value: '항목 2' },
    ],
    isEssential: true,
  };

  const addQuestion = () => {
    const updatedQuestions = [...surveyInfo.questions, basicData];
    setSurveyInfo({ questions: updatedQuestions });
  };

  return (
    <div className="border-t-[1px] border-gray-2 flex h-14 items-center">
      <button onClick={addQuestion} className="flex-1 border-r-[1px] border-gray-2">
        + 항목 추가
      </button>
      <button className="flex-1">+ 페이지 추가</button>
    </div>
  );
};

export default AddBtns;
