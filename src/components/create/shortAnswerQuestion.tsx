import { QuestionProps, Question } from '@/types';
import { useSurveyStore } from '@/store';
import AutoResizeTextarea from '../common/textarea';
import { useState, useEffect } from 'react';
import Options from './options';
import QuestionSelect from './select';
import { onChangeQuestionType } from '@/utils/createPageUtils';

const ShortAnswerQuestion: React.FC<QuestionProps> = ({ question, isEditing }) => {
  const [explanation, setExplanation] = useState<string>(question.description || '');
  const { updateQuestion } = useSurveyStore();
  
  const handleQuestionChange = (updatedQuestion: Question) => {
    updateQuestion(question.id, updatedQuestion);
  };

  useEffect(() => {
    setExplanation(question.description || '');
  }, [question.description]);

  return (
    <>
      {isEditing ? (
        <>
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
          <input
            className="p-3 rounded-lg w-full bg-gray-1 mt-3"
            type="text"
            name={`question-${question.id}`}
            disabled
            placeholder="참여자의 답변 입력란 (최대 100자)"
          />
          <Options />
        </>
      ) : (
        <>
          <p className="font-bold">Q. {question.title || '(질문 없음)'}</p>
          <p className="caption">{question.description || ''}</p>
          <input
            className="p-3 rounded-lg w-full bg-gray-1 mt-3"
            type="text"
            name={`question-${question.id}`}
            disabled
            placeholder="참여자의 답변 입력란 (최대 100자)"
          />
        </>
      )}
    </>
  );
};

export default ShortAnswerQuestion;
