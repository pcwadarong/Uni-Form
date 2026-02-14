/**
 * ID 기반으로 결정론적 색상 반환
 * 같은 ID는 항상 같은 색상 반환
 * 설문 관련 컴포넌트에서 사용
 * @param id - 데이터 ID
 * @returns Tailwind CSS 전체 클래스 이름 (예: "bg-green-50")
 */
export default function getRandomColor(id: string) {
  const colors = ["bg-green-50", "bg-green-100", "bg-green-300"];
  const hash = Array.from(id).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}
