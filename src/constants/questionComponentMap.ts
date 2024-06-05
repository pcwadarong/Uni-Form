import CategoryQuestion from '@/components/create/categoryQuestion';
import CheckboxQuestion from '@/components/create/checkboxQuestion';
import ConsentQuestion from '@/components/create/consentQuestion';
import DropDownQuestion from '@/components/create/dropDownQuestion';
import FileQuestion from '@/components/create/fileQuestion';
import ShortAnswerQuestion from '@/components/create/shortAnswerQuestion';
import LongAnswerQuestion from '@/components/create/longAnswerQueestion';
import ScheduleQuestion from '@/components/create/scheduleQuestion';
import RadioQuestion from '@/components/create/radioQuestion';
import ParticipantInfoQuestion from '@/components/create/participantInfoQuestion';
import ScoreQuestion from '@/components/create/scoreQuestion';
import StarRatingQuestion from '@/components/create/starRatingQuestion';
import TableQuestion from '@/components/create/tableQuestion';
import { QuestionProps } from '@/types';

export const questionComponentMap: { [key: string]: React.FC<QuestionProps> } = {
  category: CategoryQuestion,
  checkbox: CheckboxQuestion,
  consent: ConsentQuestion,
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
