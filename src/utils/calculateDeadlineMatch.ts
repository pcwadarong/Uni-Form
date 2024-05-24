import { Survey } from '@/types';
import parseDateString from './parseDateString';

const calculateDeadlineMatch = (item: Survey, deadline: string) => {
  const endDate = parseDateString(item.duration.split(' ~ ')[1]);
  const currentDate = new Date();
  const diffTime = endDate.getTime() - currentDate.getTime();
  const date = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return (
    deadline === 'all' ||
    (deadline !== '15' && date <= parseInt(deadline) && date >= 0) ||
    (deadline === '15' && date >= parseInt(deadline))
  );
};

export default calculateDeadlineMatch;