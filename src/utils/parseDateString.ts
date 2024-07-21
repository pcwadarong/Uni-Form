export default function parseDateString(id: string, dateString: string): Date {
  if (dateString === '바로시작') {
    const isoDateString = id.split('-').slice(1).join('-').split('T')[0];
    const [year, month, day] = isoDateString.split('-').map(Number);
    return new Date(year, month - 1, day, 0, 0, 0);
  } else if (dateString === '제한없음') {
    return new Date('9999-12-31T23:59:59.999Z');
  } else {
    const [datePart, timePart] = dateString.split(' ');

    if (!datePart || !timePart) {
      throw new Error('Invalid date format');
    }

    const [year, month, day] = datePart.split('.').map(Number);

    // 오전/오후 구별 및 시간 변환
    const isPM = timePart.includes('오후');
    const [hoursStr, minutesStr] = timePart.replace('오후', '').replace('오전', '').split(':');

    const hours = Number(hoursStr);
    const minutes = Number(minutesStr);

    // 오전/오후를 반영한 시간 조정
    const adjustedHours = isPM ? (hours !== 12 ? hours + 12 : hours) : hours === 12 ? 0 : hours;

    return new Date(year, month - 1, day, adjustedHours, minutes);
  }
}
