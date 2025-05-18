import questionComponentMap from "@/constants/questionComponentMap";
import { useResponseStore } from "@/store/response";
import { useSurveyStore } from "@/store/survey";
import type { Question, QuestionProps, QuestionType } from "@/types";
import type { DraggableProvided } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import AutoResizeTextarea from "../ui/textarea";
import RadioQuestion from "./question/radioQuestion";
import QuestionSelect from "./select";

interface ExtendedQuestionProps extends QuestionProps {
  onEditToggle?: () => void;
  isEssential: boolean;
  provided?: DraggableProvided;
}

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

  const handleQuestionChange = (updatedQuestion: Question) => {
    updateQuestion(question.id, updatedQuestion);
  };

  useEffect(() => {
    setExplanation(question.description || "");
  }, [question.description]);

  const handleTypeChange = (newType: string) => {
    updateQuestionType(question.id, newType as QuestionType);
  };

  const handleResponseChange = (newResponse: string | number | string[] | number[]) => {
    setResponse(question.timestamp, newResponse);
  };

  return (
    <div
      onClick={onEditToggle}
      className={`bg-foreground rounded-2xl overflow-hidden shadow-md p-5 ${
        mode === "editing" ? "border border-green-300" : ""
      }`}
    >
      {mode === "editing" ? (
        <>
          <div
            className="text-center cursor-move select-none p-10 -m-10"
            {...(provided?.dragHandleProps || {})}
            aria-label="질문 이동 핸들"
          >
            <span className="blind">질문 이동하기</span>=
          </div>
          <QuestionSelect value={question.type} handleTypeChange={handleTypeChange} />
          <div className="font-bold flex">
            {isEssential && (
              <span aria-hidden="true" className="text-red ml-[-12px] mr-[3px]">
                *
              </span>
            )}
            <span>Q.</span>
            <input
              type="text"
              value={question.title}
              placeholder="질문 입력"
              onChange={(e) => handleQuestionChange({ ...question, title: e.target.value })}
              className="ml-1 flex-1 focused_input"
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
              className="text-red ml-[-12px] mr-[3px]"
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
