import { QuestionProps } from '@/types';
import { handleOptionChange } from '@/utils/handleOptionChange';

const CheckboxQuestion: React.FC<QuestionProps> = ({ question, isEditing, onChange }) => {
  if (isEditing) {
    return (
      <div>
        <input
          type="text"
          value={question.question}
          onChange={(e) => onChange({ ...question, question: e.target.value })}
        />
        {question.options?.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => {
              const newOptions = [...(question.options || [])];
              newOptions[index] = e.target.value;
              onChange({ ...question, options: newOptions });
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <p>{question.question}</p>
      {question.options?.map((option, index) => (
        <label key={index}>
          <input
            type="radio"
            name={`question-${question.id}`}
            value={option}
            checked={question.answer === option}
            onChange={(e) => handleOptionChange(question, e, onChange)}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default CheckboxQuestion;
