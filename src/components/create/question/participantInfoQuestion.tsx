'use client';

import { useSurveyStore } from '@/store';
import { QuestionProps } from '@/types';
import Options from '../options';
import isModeDisabled from '@/utils/isModeDisabled';

const ParticipantInfoQuestion: React.FC<QuestionProps> = ({ question, mode }) => {
  const { updateQuestion } = useSurveyStore();
  const isDisabled = isModeDisabled(mode);
  const selectedOption = question.selectedOption || 'name';

  const handleOptionChange = (newOption: string) => {
    updateQuestion(question.id, { ...question, selectedOption: newOption });
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
          <form className="flex gap-3" aria-label="참여자 정보 선택">
            {Object.keys(optionMap).map((option) => (
              <div key={option}>
                <input
                  type="radio"
                  id={option}
                  value={option}
                  name="option"
                  onChange={() => handleOptionChange(option)}
                  checked={selectedOption === option}
                  aria-describedby={`${option}-description`}
                />
                <label htmlFor={option} className="ml-1">
                  {optionMap[option].label}
                </label>
              </div>
            ))}
          </form>
          <p className="caption text-gray-3" id={`${selectedOption}-description`}>
            {`참여자가 직접 ${optionMap[selectedOption].label} 입력`}
          </p>
          <Options id={question.id} />
        </>
      ) : (
        <div className='flex flex-col gap-2'>
          <label
            className="overflow-hidden bg-gray-1 mt-3"
            aria-label={`${optionMap[selectedOption].placeholder}`}
          >
            <input
              type="text"
              className="w-full bg-gray-1 p-3 rounded-lg"
              disabled={isDisabled}
              placeholder={`${optionMap[selectedOption].placeholder}`}
              aria-describedby={`${selectedOption}-description`}
            />
          </label>
          {selectedOption === 'address' && (
            <label className="overflow-hidden bg-gray-1" aria-label="상세 주소 입력">
              <input
                type="text"
                className="w-full bg-gray-1 p-3 rounded-lg"
                disabled={isDisabled}
                placeholder={'상세 주소를 입력해주세요.'}
              />
            </label>
          )}
        </div>
      )}
    </>
  );
};

export default ParticipantInfoQuestion;
