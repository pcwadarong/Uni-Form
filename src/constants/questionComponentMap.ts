import CategoryQuestion from "@/features/survey/create/components/question/categoryQuestion";
import CheckboxQuestion from "@/features/survey/create/components/question/checkboxQuestion";
import DropDownQuestion from "@/features/survey/create/components/question/dropDownQuestion";
import FileQuestion from "@/features/survey/create/components/question/fileQuestion";
import LongAnswerQuestion from "@/features/survey/create/components/question/longAnswerQueestion";
import ParticipantInfoQuestion from "@/features/survey/create/components/question/participantInfoQuestion";
import RadioQuestion from "@/features/survey/create/components/question/radioQuestion";
import ScheduleQuestion from "@/features/survey/create/components/question/scheduleQuestion";
import ScoreQuestion from "@/features/survey/create/components/question/scoreQuestion";
import ShortAnswerQuestion from "@/features/survey/create/components/question/shortAnswerQuestion";
import StarRatingQuestion from "@/features/survey/create/components/question/starRatingQuestion";
import TableQuestion from "@/features/survey/create/components/question/tableQuestion";
import type { QuestionProps } from "@/types";

export const questionComponentMap: { [key: string]: React.FC<QuestionProps> } = {
  category: CategoryQuestion,
  checkbox: CheckboxQuestion,
  dropdown: DropDownQuestion,
  file: FileQuestion,
  "short answer": ShortAnswerQuestion,
  "long answer": LongAnswerQuestion,
  schedule: ScheduleQuestion,
  radio: RadioQuestion,
  participant: ParticipantInfoQuestion,
  score: ScoreQuestion,
  star: StarRatingQuestion,
  table: TableQuestion,
};
