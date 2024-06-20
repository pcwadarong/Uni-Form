import { QuestionProps, Question } from '@/types';
import { useSurveyStore } from '@/store';
import questionComponentMap from '@/constants/questionComponentMap';
import { useState, useEffect } from 'react';
import RadioQuestion from './radioQuestion';
import QuestionSelect from './select';
import { onChangeQuestionType } from '@/utils/createPageUtils';
import AutoResizeTextarea from '../common/textarea';

interface ExtendedQuestionProps extends QuestionProps {
  onEditToggle: () => void;
  provided: any;
}

const Questions: React.FC<ExtendedQuestionProps> = ({
  question,
  isEditing,
  onEditToggle,
  provided,
}) => {
  const QuestionComponent = questionComponentMap[question.type] || RadioQuestion;
  const [explanation, setExplanation] = useState<string>(question.description || '');
  const { updateQuestion } = useSurveyStore();

  const handleQuestionChange = (updatedQuestion: Question) => {
    updateQuestion(question.id, updatedQuestion);
  };

  useEffect(() => {
    setExplanation(question.description || '');
  }, [question.description]);

  return (
    <div
      onClick={onEditToggle}
      className={`bg-white rounded-2xl overflow-hidden shadow-md p-4 ${
        isEditing ? 'border border-primary' : ''
      }`}
    >
      {isEditing ? (
        <>
          <div
            className="text-center cursor-move select-none p-10 -m-10"
            {...provided.dragHandleProps}
          >
            =
          </div>
          <QuestionSelect
            value={question.type}
            onChangeQuestionType={(e) => onChangeQuestionType(e, handleQuestionChange, question)}
          />
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
      <QuestionComponent question={question} isEditing={isEditing} />
    </div>
  );
};

export default Questions;
