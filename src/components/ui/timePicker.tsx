type TimePickerProps = {
  type: 'start' | 'end';
  date: Date | undefined;
  onChange: (type: 'start' | 'end', period: string, hours: number, minutes: number) => void;
};

const TimePicker: React.FC<TimePickerProps> = ({ type, date, onChange }) => {
  if (!date) return null;

  const newDate = new Date(date);
  const currentHours = newDate.getHours();
  const currentMinutes = newDate.getMinutes();
  const period = currentHours < 12 ? 'AM' : 'PM';
  const hours12Format = currentHours % 12 === 0 ? 12 : currentHours % 12;

  return (
    <div id="start-time" className="flex items-center w-full text-center p-2 gap-3">
      <select
        className="flex-1"
        defaultValue={period}
        onChange={(e) => onChange(type, e.target.value, hours12Format, currentMinutes)}
      >
        <option value="AM">오전</option>
        <option value="PM">오후</option>
      </select>
      <select
        className="flex-1"
        defaultValue={hours12Format}
        onChange={(e) => onChange(type, period, Number(e.target.value), currentMinutes)}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i + 1}>
            {String(i + 1).padStart(2, '0')}
          </option>
        ))}
      </select>
      <span>:</span>
      <select
        className="flex-1"
        defaultValue={String(currentMinutes).padStart(2, '0')}
        onChange={(e) => onChange(type, period, hours12Format, Number(e.target.value))}
      >
        <option value="00">00</option>
        <option value="30">30</option>
      </select>
    </div>
  );
};

export default TimePicker;
