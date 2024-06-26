import { QuestionProps } from '@/types';
import Options from '../options';
import isModeDisabled from '@/utils/isModeDisabled';

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
      />
      {mode === 'editing' && <Options id={question.id} />}
    </>
  );
};

export default ShortAnswerQuestion;
