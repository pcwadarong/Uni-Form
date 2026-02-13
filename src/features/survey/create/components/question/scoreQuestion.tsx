import Options from "@/features/survey/create/components/options";
import isModeDisabled from "@/lib/utils/isModeDisabled";
import type { QuestionProps } from "@/types";
const ScoreQuestion: React.FC<QuestionProps> = ({ question, mode }) => {
  const isDisabled = isModeDisabled(mode);

  return (
    <>
      <input type="text" disabled={isDisabled} />
      <div>{mode === "editing" && <Options id={question.id} />}</div>
    </>
  );
};

export default ScoreQuestion;
