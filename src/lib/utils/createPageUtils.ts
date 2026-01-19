import type { Question } from "@/types";

interface DeleteProps {
  question: Question;
  id: number;
  handleQuestionChange: (question: Question) => void;
}

export const deleteOption = ({ question, id, handleQuestionChange }: DeleteProps) => {
  if (question.options && question.options.length > 1) {
    handleQuestionChange({
      ...question,
      options: question.options.filter((option) => option.id !== id),
    });
  }
};
