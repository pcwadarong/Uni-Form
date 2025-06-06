import isModeDisabled from "@/lib/utils/isModeDisabled";
import type { QuestionProps } from "@/types/types";
import Options from "../options";

const ScheduleQuestion: React.FC<QuestionProps> = ({ question, mode }) => {
  const isDisabled = isModeDisabled(mode);

  return (
    <>
      <input type="text" disabled={isDisabled} />
      <div>{mode === "editing" && <Options id={question.id} />}</div>
    </>
  );
};

export default ScheduleQuestion;
