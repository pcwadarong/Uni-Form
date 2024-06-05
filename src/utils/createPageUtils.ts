import { QuestionProps } from '@/types';

export const onChangeQuestionType = (
  e: React.ChangeEvent<HTMLSelectElement>,
  handleQuestionChange: (question: QuestionProps['question']) => void,
  question: QuestionProps['question'],
) => {
  handleQuestionChange({
    ...question,
    type: e.target.value,
  });
};

interface DeleteProps {
  question: QuestionProps['question'];
  id: number;
  handleQuestionChange: (question: QuestionProps['question']) => void;
}

export const deleteOption = ({ question, id, handleQuestionChange }: DeleteProps) => {
  if (question.options && question.options.length > 1) {
    handleQuestionChange({
      ...question,
      options: question.options.filter((option) => option.id !== id),
    });
  }
};
