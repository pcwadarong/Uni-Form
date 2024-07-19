import { Survey, Recruit } from '@/types';
import parseDateString from './parseDateString';

export const calculateDeadlineMatch = (item: Survey | Recruit, deadline: string) => {
  const currentDate = new Date();
  const diffTime = parseDateString(item.endDate).getTime() - currentDate.getTime();
  const date = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return (
    deadline === 'all' ||
    (deadline !== '15' && date <= parseInt(deadline) && date >= 0) ||
    (deadline === '15' && date >= parseInt(deadline))
  );
};