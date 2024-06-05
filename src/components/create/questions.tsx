import { QuestionProps } from '@/types';
import questionComponentMap from '@/constants/questionComponentMap';
import RadioQuestion from './radioQuestion';

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

  return (
    <div
      onClick={onEditToggle}
      className={`bg-white rounded-2xl overflow-hidden shadow-md p-4 ${
        isEditing ? 'border border-primary' : ''
      }`}
    >
      {isEditing ? (
        <div
          className="text-center cursor-move select-none p-10 -m-10"
          {...provided.dragHandleProps}
        >
          =
        </div>
      ) : (
        ''
      )}
      <QuestionComponent question={question} isEditing={isEditing} />
    </div>
  );
};

export default Questions;
