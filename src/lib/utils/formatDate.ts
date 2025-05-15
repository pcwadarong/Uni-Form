export default function formatDate(date?: Date) {
  if (!date) {
    return "날짜가 설정되지 않았습니다";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "오후" : "오전";
  const formattedHours = hours % 12 || 12;

  return `${year}.${month}.${day} / ${ampm} ${formattedHours}:${minutes}`;
}
