interface SpecialProps {
  endDate: number;
  point?: number;
  showPoint?: boolean; // recruit: false
}

export default function Special({ endDate, point = 0, showPoint = false }: SpecialProps) {
  const diffMs = endDate - Date.now();
  const isEndingSoon = diffMs > 0 && diffMs <= 7 * 24 * 60 * 60 * 1000;
  const remainingDays = isEndingSoon ? Math.ceil(diffMs / (1000 * 60 * 60 * 24)) : null;

  return (
    <div className="flex truncate space-x-2">
      {remainingDays && (
        <span
          className="rounded-md px-2 py-1 bg-demonstrate text-center text-red-500 caption"
          aria-label={`마감 ${remainingDays}일 전`}
        >
          마감 {remainingDays}일 전
        </span>
      )}
      {showPoint && point > 0 && (
        <span
          className="rounded-md px-2 py-1 bg-green-400 text-center text-white caption"
          aria-label={`${point}포인트`}
        >
          {point}P
        </span>
      )}
    </div>
  );
}
