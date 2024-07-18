interface Props {
  startDate: string;
  endDate: string;
}
import parseDateString from '@/utils/parseDateString';

export default function Special({ startDate, endDate }: Props) {
  let date = 0;
  if (startDate) {
    const currentDate = new Date();
    const diffTime = parseDateString(endDate).getTime() - currentDate.getTime();
    date = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  return (
    <div className="flex space-x-2 truncate">
      {date > 0 && date <= 7 && (
        <span className="px-2 py-1 bg-lightRed text-center text-red caption rounded-md">
          {`마감 ${date}일 전`}
        </span>
      )}
    </div>
  );
}
