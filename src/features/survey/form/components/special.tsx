interface SpecialProps {
  endDate: number;
  point?: number;
  showPoint?: boolean;
}

/**
 * 특별 표시 컴포넌트
 * 마감 임박 및 포인트 정보를 표시
 * @param endDate - 마감 일시 (타임스탬프)
 * @param point - 포인트 (설문에만 표시)
 * @param showPoint - 포인트 표시 여부
 */
export default function Special({ endDate, point = 0, showPoint = false }: SpecialProps) {
  const diffMs = endDate - Date.now();
  const isEndingSoon = diffMs > 0 && diffMs <= 7 * 24 * 60 * 60 * 1000;
  const remainingDays = isEndingSoon ? Math.ceil(diffMs / (1000 * 60 * 60 * 24)) : null;

  return (
    <div className="flex space-x-2 truncate">
      {remainingDays && (
        <span
          className="caption rounded-md bg-demonstrate bg-red-500 px-2 py-1 text-center text-surface"
          aria-label={`마감 ${remainingDays}일 전`}
        >
          마감 {remainingDays}일 전
        </span>
      )}
      {showPoint && point > 0 && (
        <span
          className="caption rounded-md bg-green-400 px-2 py-1 text-center text-white"
          aria-label={`${point}포인트`}
        >
          {point}P
        </span>
      )}
    </div>
  );
}
