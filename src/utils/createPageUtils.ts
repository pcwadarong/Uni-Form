import { QuestionProps } from '@/types';

export const onChangeQuestionType = (
  e: React.ChangeEvent<HTMLSelectElement>,
  onChange: (question: QuestionProps['question']) => void,
  question: QuestionProps['question'],
) => {
  onChange({
    ...question,
    type: e.target.value,
  });
};

interface DeleteProps {
  question: QuestionProps['question'];
  id: number;
  onChange: (question: QuestionProps['question']) => void;
}

export const deleteOption = ({ question, id, onChange }: DeleteProps) => {
  if (question.options && question.options.length > 1) {
    onChange({
      ...question,
      options: question.options.filter((option) => option.id !== id),
    });
  }
};
