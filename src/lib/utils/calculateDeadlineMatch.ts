/**
 * 종료일과 마감 필터 조건이 일치하는지 확인
 * @param endDate - 종료일 타임스탬프
 * @param deadline - 마감 필터 조건 ("all" | "15" | 기타 일수 문자열)
 * @returns 필터 조건 일치 여부
 */
export const calculateDeadlineMatch = (endDate: number, deadline: string) => {
  const diffMs = endDate - Date.now();
  const date = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return (
    deadline === "all" ||
    (deadline !== "15" && date <= Number.parseInt(deadline) && date >= 0) ||
    (deadline === "15" && date >= Number.parseInt(deadline))
  );
};
