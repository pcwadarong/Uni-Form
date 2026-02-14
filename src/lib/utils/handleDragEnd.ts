import type { Option, Question } from "@/types";
import type { DropResult } from "@hello-pangea/dnd";

/**
 * 질문 드래그 앤 드롭 종료 핸들러
 * 질문 순서를 업데이트
 * @param result - 드래그 앤 드롭 결과
 * @param questions - 현재 질문 배열
 * @param setQuestions - 질문 배열 업데이트 함수
 */
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

/**
 * 옵션 드래그 앤 드롭 종료 핸들러
 * 옵션 순서를 업데이트
 * @param result - 드래그 앤 드롭 결과
 * @param options - 현재 옵션 배열
 * @param setOptions - 옵션 배열 업데이트 함수
 */
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
