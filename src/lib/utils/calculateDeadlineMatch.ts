export const calculateDeadlineMatch = (endDate: number, deadline: string) => {
  const diffMs = endDate - Date.now();
  const date = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return (
    deadline === "all" ||
    (deadline !== "15" && date <= Number.parseInt(deadline) && date >= 0) ||
    (deadline === "15" && date >= Number.parseInt(deadline))
  );
};
