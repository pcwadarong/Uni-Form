'use client';

import { useSurveyStore } from '@/store';
import { QuestionProps, Question } from '@/types';
import { useState } from 'react';
import Options from '../options';

const ParticipantInfoQuestion: React.FC<QuestionProps> = ({ question, mode }) => {
  const [selectedOption, setselectedOption] = useState('name');
  const [placeholder, setPlaceholder] = useState('이름을 입력해주세요');
  const { updateQuestion } = useSurveyStore();

  const handleQuestionChange = (updatedQuestion: Question) => {
    updateQuestion(question.id, updatedQuestion);
  };

  const handleOptionChange = (newOption: string, newPlaceholder: string) => {
    setselectedOption(newOption);
    setPlaceholder(newPlaceholder);
    handleQuestionChange({ ...question, selectedOption });
  };

  const optionMap: Record<string, { label: string; placeholder: string }> = {
    name: { label: '이름', placeholder: '이름을 입력해주세요' },
    contact: { label: '연락처', placeholder: '연락처를 입력해주세요. (- 없이 번호만 입력)' },
    address: { label: '주소', placeholder: '기본 주소를 입력해주세요' },
    email: { label: '이메일 주소', placeholder: '이메일 주소를 입력해주세요' },
  };

  return (
    <>
      {mode === 'editing' ? (
        <>
          <form className="flex gap-3">
            {Object.keys(optionMap).map((option) => (
              <div key={option}>
                <input
                  type="radio"
                  id={option}
                  value={option}
                  name="option"
                  onChange={() => handleOptionChange(option, optionMap[option].placeholder)}
                  checked={selectedOption === option}
                />
                <label htmlFor={option} className="ml-1">
                  {optionMap[option].label}
                </label>
              </div>
            ))}
          </form>
          <p className="caption text-gray-3">{`참여자가 직접 ${optionMap[selectedOption].label} 입력`}</p>
          <Options id={question.id} />
        </>
      ) : (
        <>
          <label className="p-3 rounded-lg flex gap-2 bg-gray-1 mt-3 text-gray-3">
            <input type="text" className="w-full" disabled value={placeholder} />
          </label>
          {selectedOption === 'address' && (
            <label className="p-3 rounded-lg flex gap-2 bg-gray-1 mt-3 text-gray-3">
              <input type="text" className="w-full" disabled value={'상세 주소를 입력해주세요.'} />
            </label>
          )}
        </>
      )}
    </>
  );
};

export default ParticipantInfoQuestion;
