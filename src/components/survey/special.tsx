import { Survey } from '@/types';
interface SpecialProps extends Pick<Survey, 'point' | 'duration'> {}

export default function Special({ point, duration }: SpecialProps) {
  let date;
  if (duration) {
    const endDate = new Date(duration.split(' ~ ')[1]);
    const currentDate = new Date();
    const diffTime = endDate.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    date = diffDays >= 0 ? `${diffDays}일` : '종료';
  }

  return (
    <div className="flex space-x-2">
      <span className="px-3 py-1.5 bg-lightRed text-center text-red text-xs rounded-md">
        {date ? `마감 ${date} 전` : ''}
      </span>
      <span className="px-3 py-1.5 bg-primary text-center text-white text-xs rounded-md">
        {point ? `${point}P` : ''}
      </span>
    </div>
  );
}
