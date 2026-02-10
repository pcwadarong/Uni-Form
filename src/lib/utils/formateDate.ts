import { LIMITLESS_DATE } from "@/constants/initSurveyInfo";

/**
 * 타임스탬프를 형식화된 날짜 문자열로 변환
 * @param time - 변환할 타임스탬프 (밀리초)
 * @param isShort - 짧은 형식 사용 여부 (기본: false)
 * @returns 형식화된 날짜 문자열 ("제한 없음" 또는 날짜 형식)
 */
export default function formateDate(time: number, isShort?: boolean): string {
  if (!time) return "no date";
  if (time >= LIMITLESS_DATE) return "제한 없음";

  const date = new Date(time);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = date.getHours() || 12;
  const minutes = String(date.getMinutes()).padStart(2, "0");

  if (isShort) return `${year - 2000}.${month}.${day} ${hours}:${minutes}`;

  const ampm = hours > 12 ? "오후" : "오전";
  const formattedHours = hours % 12 || 12;

  return `${year}.${month}.${day} / ${ampm} ${formattedHours}:${minutes}`;
}
