import isModeDisabled from "@/lib/utils/isModeDisabled";
import type { QuestionProps } from "@/types/types";
import Options from "../options";

const LongAnswerQuestion: React.FC<QuestionProps> = ({ question, mode }) => {
  const isDisabled = isModeDisabled(mode);

  return (
    <>
      <textarea
        className="p-3 rounded-lg w-full mt-3 bg-gray-300/20"
        name={`question-${question.id}`}
        disabled={isDisabled}
        placeholder="참여자의 답변 입력란 (최대 2000자)"
        aria-label="참여자의 답변 입력란"
        aria-describedby={`question-${question.id}-description`}
      />
      {mode === "editing" && <Options id={question.id} />}
    </>
  );
};

export default LongAnswerQuestion;
