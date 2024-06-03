import { Question } from '@/types';

export const handleOptionChange = (
  question: Question,
  e: React.ChangeEvent<HTMLInputElement>,
  onChange: (updatedQuestion: Question) => void,
) => {
  const updatedQuestion = { ...question, answer: e.target.value };
  onChange(updatedQuestion);
};
