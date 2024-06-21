import CategoryQuestion from '@/components/create/question/categoryQuestion';
import CheckboxQuestion from '@/components/create/question/checkboxQuestion';
import DropDownQuestion from '@/components/create/question/dropDownQuestion';
import FileQuestion from '@/components/create/question/fileQuestion';
import ShortAnswerQuestion from '@/components/create/question/shortAnswerQuestion';
import LongAnswerQuestion from '@/components/create/question/longAnswerQueestion';
import ScheduleQuestion from '@/components/create/question/scheduleQuestion';
import RadioQuestion from '@/components/create/question/radioQuestion';
import ParticipantInfoQuestion from '@/components/create/question/participantInfoQuestion';
import ScoreQuestion from '@/components/create/question/scoreQuestion';
import StarRatingQuestion from '@/components/create/question/starRatingQuestion';
import TableQuestion from '@/components/create/question/tableQuestion';
import { QuestionProps } from '@/types';

export const questionComponentMap: { [key: string]: React.FC<QuestionProps> } = {
  category: CategoryQuestion,
  checkbox: CheckboxQuestion,
  dropdown: DropDownQuestion,
  file: FileQuestion,
  'short answer': ShortAnswerQuestion,
  'long answer': LongAnswerQuestion,
  schedule: ScheduleQuestion,
  radio: RadioQuestion,
  participant: ParticipantInfoQuestion,
  score: ScoreQuestion,
  star: StarRatingQuestion,
  table: TableQuestion,
};

export default questionComponentMap;
