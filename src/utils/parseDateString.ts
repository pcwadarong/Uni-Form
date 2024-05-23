export default function parseDateString(dateString: string) {
  const [datePart, timePart] = dateString.split(' ');
  const [year, month, day] = datePart.split('.').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);
  const fullYear = 2000 + year;

  return new Date(fullYear, month - 1, day, hours, minutes);
}
