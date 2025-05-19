import parseDateString from "@/lib/utils/parseDateString";
import type { Form } from "@/types";

interface SpecialProps {
  id: string;
  endDate: string;
  point?: Form["point"];
  showPoint?: boolean; // recruit: false
}

export default function Special({ id, endDate, point = 0, showPoint = false }: SpecialProps) {
  const currentDate = new Date();
  const diffTime = parseDateString(id, endDate).getTime() - currentDate.getTime();
  const date = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="flex space-x-2 truncate">
      {date > 0 && date <= 7 && (
        <span
          className="px-2 py-1 bg-lightRed text-center text-red-500 caption rounded-md"
          aria-label={`마감 ${date}일 전`}
        >
          마감 {date}일 전
        </span>
      )}
      {showPoint && point > 0 && (
        <span
          className="px-2 py-1 bg-green-300 text-center text-white caption rounded-md"
          aria-label={`${point}포인트`}
        >
          {point}P
        </span>
      )}
    </div>
  );
}
