import { QuestionProps } from '@/types';
import Options from './options';

const LongAnswerQuestion: React.FC<QuestionProps> = ({ question, mode }) => {
  return (
    <>
      <textarea
        className="p-3 rounded-lg w-full bg-gray-1 mt-3"
        name={`question-${question.id}`}
        disabled
        placeholder="참여자의 답변 입력란 (최대 2000자)"
      />
      {mode === 'editing' && <Options id={question.id} />}
    </>
  );
};

export default LongAnswerQuestion;
