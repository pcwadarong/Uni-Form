import { QuestionProps, Question, QuestionType } from '@/types';
import { useSurveyStore } from '@/store';
import questionComponentMap from '@/constants/questionComponentMap';
import { useState, useEffect } from 'react';
import RadioQuestion from './question/radioQuestion';
import QuestionSelect from './select';
import AutoResizeTextarea from '../common/textarea';

interface ExtendedQuestionProps extends QuestionProps {
  onEditToggle: () => void;
  provided: any;
}

const Questions: React.FC<ExtendedQuestionProps> = ({ question, mode, onEditToggle, provided }) => {
  const QuestionComponent = questionComponentMap[question.type] || RadioQuestion;
  const [explanation, setExplanation] = useState<string>(question.description || '');
  const { updateQuestion, updateQuestionType } = useSurveyStore();

  const handleQuestionChange = (updatedQuestion: Question) => {
    updateQuestion(question.id, updatedQuestion);
  };

  useEffect(() => {
    setExplanation(question.description || '');
  }, [question.description]);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateQuestionType(question.id, e.target.value as QuestionType);
  };

  return (
    <div
      onClick={onEditToggle}
      className={`bg-white rounded-2xl overflow-hidden shadow-md p-4 ${
        mode === 'editing' ? 'border border-primary' : ''
      }`}
    >
      {mode === 'editing' ? (
        <>
          <div
            className="text-center cursor-move select-none p-10 -m-10"
            {...provided.dragHandleProps}
          >
            <span className="blind">질문 이동하기</span>=
          </div>
          <QuestionSelect value={question.type} onChangeQuestionType={handleTypeChange} />
          <div className="font-bold flex">
            <span>Q.</span>
            <input
              type="text"
              value={question.title}
              placeholder="질문 입력"
              onChange={(e) => handleQuestionChange({ ...question, title: e.target.value })}
              className="ml-1 flex-1 focused_input"
            />
          </div>

          <AutoResizeTextarea
            value={explanation}
            onChange={(e) => {
              setExplanation(e.target.value);
              handleQuestionChange({ ...question, description: e.target.value });
            }}
            className="caption"
            placeholder="설명 입력 (선택 사항)"
          />
        </>
      ) : (
        <>
          <p className="font-bold">Q. {question.title || '(질문 없음)'}</p>
          <p className="caption">{question.description || ''}</p>
        </>
      )}
      <QuestionComponent question={question} mode={mode} />
    </div>
  );
};

export default Questions;
