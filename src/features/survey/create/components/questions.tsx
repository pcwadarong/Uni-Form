import questionComponentMap from "@/constants/questionComponentMap";
import AutoResizeTextarea from "@/features/shared/ui/textarea";
import { useSurveyStore } from "@/features/survey/create/store/survey";
import { useResponseStore } from "@/features/survey/form/store/response";
import type { Question, QuestionProps, QuestionType } from "@/features/survey/types";
import type { DraggableProvided } from "@hello-pangea/dnd";
import { useCallback, useEffect, useState } from "react";
import RadioQuestion from "./question/radioQuestion";
import QuestionSelect from "./select";

interface ExtendedQuestionProps extends QuestionProps {
  onEditToggle?: () => void;
  isEssential: boolean;
  provided?: DraggableProvided;
}

/**
 * 질문 컴포넌트
 * 질문 편집 및 응답 입력 UI 제공
 * @param question - 질문 데이터
 * @param mode - 모드 (editing, testing, responding)
 * @param isEssential - 필수 여부
 * @param onEditToggle - 편집 토글 핸들러 (선택)
 * @param provided - 드래그 앤 드롭 제공 객체 (선택)
 */
const Questions: React.FC<ExtendedQuestionProps> = ({
  question,
  mode,
  isEssential,
  onEditToggle,
  provided,
}) => {
  const QuestionComponent = questionComponentMap[question.type] || RadioQuestion;
  const [explanation, setExplanation] = useState<string>(question.description || "");
  const { updateQuestion, updateQuestionType } = useSurveyStore();
  const { setResponse } = useResponseStore();

  /**
   * 질문 변경 핸들러
   * @param updatedQuestion - 업데이트된 질문 데이터
   */
  const handleQuestionChange = useCallback(
    (updatedQuestion: Question) => {
      updateQuestion(question.id, updatedQuestion);
    },
    [question.id, updateQuestion],
  );

  useEffect(() => {
    setExplanation(question.description || "");
  }, [question.description]);

  /**
   * 질문 타입 변경 핸들러
   * @param newType - 새로운 질문 타입
   */
  const handleTypeChange = useCallback(
    (newType: string) => {
      updateQuestionType(question.id, newType as QuestionType);
    },
    [question.id, updateQuestionType],
  );

  /**
   * 응답 변경 핸들러
   * @param newResponse - 새로운 응답 값
   */
  const handleResponseChange = useCallback(
    (newResponse: string | number | string[] | number[]) => {
      setResponse(question.timestamp, newResponse);
    },
    [question.timestamp, setResponse],
  );

  return (
    <div
      onClick={onEditToggle}
      onKeyDown={onEditToggle}
      className={`overflow-hidden rounded-2xl bg-tone1 p-5 shadow-md ${
        mode === "editing" ? "border border-green-300" : ""
      }`}
    >
      {mode === "editing" ? (
        <>
          <div
            className="-m-10 cursor-move select-none p-10 text-center"
            {...(provided?.dragHandleProps || {})}
            aria-label="질문 이동 핸들"
          >
            <span className="blind">질문 이동하기</span>=
          </div>
          <QuestionSelect value={question.type} handleTypeChange={handleTypeChange} />
          <div className="flex font-bold">
            {isEssential && (
              <span aria-hidden="true" className="mr-[3px] ml-[-12px] text-red">
                *
              </span>
            )}
            <span>Q.</span>
            <input
              type="text"
              value={question.title}
              placeholder="질문 입력"
              onChange={(e) => handleQuestionChange({ ...question, title: e.target.value })}
              className="focused_input ml-1 flex-1"
            />
          </div>

          <AutoResizeTextarea
            value={explanation}
            onChange={(e) => {
              setExplanation(e.target.value);
              handleQuestionChange({
                ...question,
                description: e.target.value,
              });
            }}
            className="caption"
            placeholder="설명 입력 (선택 사항)"
          />
        </>
      ) : (
        <div className="mb-2">
          {isEssential && (
            <span
              aria-label="필수 항목"
              aria-hidden="true"
              className="mr-[3px] ml-[-12px] text-red"
            >
              *
            </span>
          )}
          <span className="font-bold">Q. {question.title || "(질문 없음)"}</span>
          <p className="caption">{question.description || ""}</p>
        </div>
      )}
      <QuestionComponent question={question} mode={mode} onResponseChange={handleResponseChange} />
    </div>
  );
};

export default Questions;
