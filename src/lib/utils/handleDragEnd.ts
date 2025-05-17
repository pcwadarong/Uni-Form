import type { Option, Question } from "@/types";
import type { DropResult } from "react-beautiful-dnd";

export const handleQuestionDragEnd = (
  result: DropResult,
  questions: Question[],
  setQuestions: (questions: Question[]) => void,
) => {
  const { source, destination } = result;
  if (!destination) return;

  const updatedQuestions = [...questions];
  const [removed] = updatedQuestions.splice(source.index, 1);
  updatedQuestions.splice(destination.index, 0, removed);

  setQuestions(updatedQuestions);
};

export const handleOptionDragEnd = (
  result: DropResult,
  options: Option[],
  setOptions: (options: Option[]) => void,
) => {
  const { source, destination } = result;
  if (!destination) return;

  const updatedOptions = [...options];
  const [removed] = updatedOptions.splice(source.index, 1);
  updatedOptions.splice(destination.index, 0, removed);

  setOptions(updatedOptions);
};
