import Image from 'next/image';
import { QuestionProps } from '@/types';
import Options from '../options';
import { useSurveyStore } from '@/store/survey';
import { useState, useEffect } from 'react';
//import isModeDisabled from '@/utils/isModeDisabled';

const StarRatingQuestion: React.FC<QuestionProps> = ({ question, mode }) => {
  //const isDisabled = isModeDisabled(mode);
  const { updateQuestion } = useSurveyStore();
  const [comment, setComment] = useState('1~5');

  const handleRatingStepChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const ratingStep = parseFloat(e.target.value) as 0.5 | 1;
    updateQuestion(question.id, { ...question, ratingStep });
  };

  useEffect(() => {
    setComment(question.ratingStep === 1 ? '1~5' : '0.5~5');
  }, [question.ratingStep]);

  return (
    <>
      <div className={`mt-3 flex gap-3 ${mode === 'editing' ? 'items-center' : 'flex-col'}`}>
        <div className="flex" role="radiogroup" aria-labelledby={`question-${question.id}-label`}>
          {[...Array(5)].map((_, i) => (
            <Image
              key={i}
              src={'./star.svg'}
              alt={`별 ${i + 1}`}
              width="45"
              height="45"
              role="radio"
              aria-checked="false"
            />
          ))}
        </div>
        <div className="ml-2 text-gray-4" id={`question-${question.id}-comment`}>
          {mode === 'editing' ? (
            <>
              <label htmlFor={`rating-step-${question.id}`} className="mr-2">
                단위 선택:
              </label>
              <select
                id={`rating-step-${question.id}`}
                className="border-[1px] border-gray-2 rounded-lg p-2 focus:outline-none dark:bg-gray-900"
                value={question.ratingStep || 1}
                onChange={handleRatingStepChange}
                aria-describedby={`question-${question.id}-comment`}
              >
                <option value={0.5}>0.5</option>
                <option value={1}>1</option>
              </select>
              <span className="ml-2">단위</span>
            </>
          ) : (
            `${comment}점까지 선택이 가능합니다.`
          )}
        </div>
      </div>
      {mode === 'editing' && <Options id={question.id} />}
    </>
  );
};

export default StarRatingQuestion;

// 실제로 작동할 부분을 구현해야 함
