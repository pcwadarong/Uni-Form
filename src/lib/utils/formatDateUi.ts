import parseDateString from "./parseDateString";

const formatDateString = (date: Date): string => {
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

const formatDateUi = (id: string, dateString: string): string => {
  if (dateString === "제한없음") {
    return dateString;
  }
  if (dateString === "바로시작") {
    const isoDateString = id.split("-").slice(1).join("-").split("T")[0];
    const [year, month, day] = isoDateString.split("-").map(Number);
    const date = new Date(year, month - 1, day, 0, 0, 0);
    return formatDateString(date);
  }
    const date = parseDateString(id, dateString);
    return formatDateString(date);
};

export default formatDateUi;
