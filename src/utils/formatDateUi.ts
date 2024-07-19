const formatDateUi = (dateString: string): string => {
  const date = new Date(dateString);

  const year = date.getFullYear().toString().slice(-2); // 마지막 두 자리 연도
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0'); 

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

export default formatDateUi;