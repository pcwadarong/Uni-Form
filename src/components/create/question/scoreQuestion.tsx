import { QuestionProps } from '@/types';
import Options from '../options';
import isModeDisabled from '@/utils/isModeDisabled';

const ScoreQuestion: React.FC<QuestionProps> = ({ question, mode }) => {
  const isDisabled = isModeDisabled(mode);

  return (
    <>
      <input type="text" disabled={isDisabled} />
      <div>{mode === 'editing' && <Options id={question.id} />}</div>
    </>
  );
};

export default ScoreQuestion;
