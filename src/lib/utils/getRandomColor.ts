export const getColorById = (id: string) => {
  const colors = ["green-50", "green-100", "green-300"];
  const hash = Array.from(id).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};
