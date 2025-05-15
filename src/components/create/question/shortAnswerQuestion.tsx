import isModeDisabled from '@/lib/utils/isModeDisabled';
import type { QuestionProps } from '@/types';
import Options from '../options';

const ShortAnswerQuestion: React.FC<QuestionProps> = ({ question, mode }) => {
  const isDisabled = isModeDisabled(mode);

  return (
    <>
      <input
        className="p-3 rounded-lg w-full bg-gray-1 mt-3"
        type="text"
        name={`question-${question.id}`}
        disabled={isDisabled}
        placeholder="참여자의 답변 입력란 (최대 100자)"
        aria-label="참여자의 답변 입력란"
        aria-describedby={`question-${question.id}-description`}
      />
      {mode === 'editing' && <Options id={question.id} />}
    </>
  );
};

export default ShortAnswerQuestion;
