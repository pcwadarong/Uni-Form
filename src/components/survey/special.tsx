import { Survey } from '@/types';
interface SpecialProps extends Pick<Survey, 'point' | 'endDate'> {}
import parseDateString from '@/utils/parseDateString';

export default function Special({ point, endDate }: SpecialProps) {
  let date = 0;

  const currentDate = new Date();
  const diffTime = parseDateString(endDate).getTime() - currentDate.getTime();
  date = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="flex space-x-2 truncate">
      {date > 0 && date <= 7 && (
        <span
          className="px-2 py-1 bg-lightRed text-center text-red caption rounded-md"
          aria-label={`마감 ${date}일 전`}
        >
          {`마감 ${date}일 전`}
        </span>
      )}
      {point > 0 && (
        <span
          className="px-2 py-1 bg-primary text-center text-white caption rounded-md"
          aria-label={`${point}포인트`}
        >
          {`${point}P`}
        </span>
      )}
    </div>
  );
}
