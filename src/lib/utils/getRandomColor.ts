/**
 * ID 기반으로 결정론적 색상 반환
 * 같은 ID는 항상 같은 색상 반환
 * @param id - 데이터 ID
 * @returns Tailwind CSS 색상 클래스 이름
 */
const getColorById = (id: string) => {
  const colors = ["green-50", "green-100", "green-300"];
  const hash = Array.from(id).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

export default getColorById;
