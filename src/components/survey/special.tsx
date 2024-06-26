import { Survey } from '@/types';
interface SpecialProps extends Pick<Survey, 'point' | 'duration'> {}
import parseDateString from '@/utils/parseDateString';

export default function Special({ point, duration }: SpecialProps) {
  let date = 0;
  if (duration) {
    const endDate = parseDateString(duration.split(' ~ ')[1]);
    const currentDate = new Date();
    const diffTime = endDate.getTime() - currentDate.getTime();
    date = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  return (
    <div className="flex space-x-2 truncate">
      {date > 0 && date <= 7 && (
        <span className="px-2 py-1 bg-lightRed text-center text-red caption rounded-md">
          {`마감 ${date}일 전`}
        </span>
      )}
      {point > 0 && (
        <span className="px-2 py-1 bg-primary text-center text-white caption rounded-md">
          {`${point}P`}
        </span>
      )}
    </div>
  );
}
