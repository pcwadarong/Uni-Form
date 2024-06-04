import { QuestionProps } from '@/types';

import CheckboxQuestion from './checkboxQuestion';
import RadioQuestion from './radioQuestion';
import CategoryQuestion from './categoryQuestion';
import ConsentQuestion from './consentQuestion';
import ScheduleQuestion from './scheduleQuestion';
import DropDownQuestion from './dropDownQuestion';
import FileQuestion from './fileQuestion';
import LongAnswerQuestion from './longAnserQueestion';
import ParticipantInfoQuestion from './participantInfoQuestion';
import ScoreQuestion from './scoreQuestion';
import ShortAnswerQuestion from './shortAnswerQuestion';
import StarRatingQuestion from './starRatingQuestion';
import TableQuestion from './tableQuestion';

interface ExtendedQuestionProps extends QuestionProps {
  onEditToggle: () => void;
  provided: any;
}

const Questions: React.FC<ExtendedQuestionProps> = ({
  question,
  isEditing,
  onEditToggle,
  onChange,
  provided,
}) => {
  let QuestionComponent;

  switch (question.type) {
    case 'category':
      QuestionComponent = CategoryQuestion;
      break;
    case 'checkbox':
      QuestionComponent = CheckboxQuestion;
      break;
    case 'consent':
      QuestionComponent = ConsentQuestion;
      break;
    case 'dropdown':
      QuestionComponent = DropDownQuestion;
      break;
    case 'file':
      QuestionComponent = FileQuestion;
      break;
    case 'short answer':
      QuestionComponent = ShortAnswerQuestion;
      break;
    case 'long answer':
      QuestionComponent = LongAnswerQuestion;
      break;
    case 'schedule':
      QuestionComponent = ScheduleQuestion;
      break;
    case 'radio':
      QuestionComponent = RadioQuestion;
      break;
    case 'participant':
      QuestionComponent = ParticipantInfoQuestion;
      break;
    case 'score':
      QuestionComponent = ScoreQuestion;
      break;
    case 'star':
      QuestionComponent = StarRatingQuestion;
      break;
    case 'table':
      QuestionComponent = TableQuestion;
      break;
    default:
      QuestionComponent = ShortAnswerQuestion;
  }

  return (
    <div
      onClick={onEditToggle}
      className={`bg-white rounded-2xl overflow-hidden shadow-md p-4 ${
        isEditing ? 'border border-primary' : ''
      }`}
    >
      {isEditing ? (
        <div className="text-center cursor-move select-none p-10 -m-10" {...provided.dragHandleProps}>
          =
        </div>
      ) : (
        ''
      )}
      <QuestionComponent question={question} isEditing={isEditing} onChange={onChange} />
    </div>
  );
};

export default Questions;
