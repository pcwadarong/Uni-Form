import { QuestionProps } from '@/types';
import Options from '../options';
import isModeDisabled from '@/utils/isModeDisabled';

const LongAnswerQuestion: React.FC<QuestionProps> = ({ question, mode }) => {
  const isDisabled = isModeDisabled(mode);

  return (
    <>
      <textarea
        className="p-3 rounded-lg w-full bg-gray-1 mt-3"
        name={`question-${question.id}`}
        disabled={isDisabled}
        placeholder="참여자의 답변 입력란 (최대 2000자)"
        aria-label="참여자의 답변 입력란"
        aria-describedby={`question-${question.id}-description`}
      />
      {mode === 'editing' && <Options id={question.id} />}
    </>
  );
};

export default LongAnswerQuestion;
