// components/survey/Question.js
import { useState } from 'react';
import CheckboxQuestion from './checkboxQuestion';
import RadioQuestion from './radioQuestion';
import CategoryQuestion from './CategoryQuestion';
import ConsentQuestion from './ConsentQuestion';
import DateTimeQuestion from './dateTimeQuestion';
import DropDownQuestion from './DropDownQuestion';
import FileQuestion from './fileQuestion';
import LongAnswerQuestion from './LongAnserQueestion';
import ParticipantInfoQuestion from './ParticipantInfoQuestion';
import ScoreQuestion from './scoreQuestion';
import ShortAnswerQuestion from './ShortAnswerQuestion';
import StarRatingQuestion from './starRatingQuestion';
import TableQuestion from './TableQuestion';

const Questions = ({ question, onQuestionChange }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (updatedQuestion) => {
    onQuestionChange(updatedQuestion);
  };

  let QuestionComponent;

  switch (question.type) {
    case 'short answer':
      QuestionComponent = ShortAnswerQuestion;
      break;
    case 'checkbox':
      QuestionComponent = CheckboxQuestion;
      break;
    case 'radio':
      QuestionComponent = RadioQuestion;
      break;
    case 'file':
      QuestionComponent = FileQuestion;
      break;
    default:
      return null;
  }

  return (
    <div onClick={handleEditToggle}>
      <QuestionComponent question={question} isEditing={isEditing} onChange={handleChange} />
    </div>
  );
};

export default Questions;
