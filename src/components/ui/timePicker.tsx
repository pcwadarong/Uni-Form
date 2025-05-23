import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TimePickerProps = {
  type: "begin" | "finish";
  date: Date | undefined;
  onChange: (type: "begin" | "finish", period: string, hours: number, minutes: number) => void;
};

const TimePicker: React.FC<TimePickerProps> = ({ type, date, onChange }) => {
  if (!date) return null;

  const newDate = new Date(date);
  const currentHours = newDate.getHours();
  const currentMinutes = newDate.getMinutes();
  const period = currentHours < 12 ? "AM" : "PM";
  const hours12Format = String(currentHours % 12 === 0 ? 12 : currentHours % 12);

  const handlePeriodChange = (value: string) => {
    onChange(type, value, Number(hours12Format), currentMinutes);
  };

  const handleHoursChange = (value: string) => {
    onChange(type, period, Number(value), currentMinutes);
  };

  const handleMinutesChange = (value: string) => {
    onChange(type, period, Number(hours12Format), Number(value));
  };

  const TriggerClass = 'flex-1 border-gray-2 mb-3';

  return (
    <div id="start-time" className="flex items-center gap-3 p-2 w-full text-center">
      <Select defaultValue={period} onValueChange={handlePeriodChange}>
        <SelectTrigger className={TriggerClass}>
          <SelectValue placeholder="오전" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="AM">오전</SelectItem>
          <SelectItem value="PM">오후</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue={hours12Format} onValueChange={handleHoursChange}>
        <SelectTrigger className={TriggerClass}>
          <SelectValue placeholder="01" />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 12 }, (_, i) => (
            <SelectItem key={String(i + 1)} value={String(i + 1)}>
              {String(i + 1).padStart(2, "0")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span>:</span>
      <Select
        defaultValue={String(currentMinutes).padStart(2, "0")}
        onValueChange={handleMinutesChange}
      >
        <SelectTrigger className={TriggerClass}>
          <SelectValue placeholder="00" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="00">00</SelectItem>
          <SelectItem value="30">30</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimePicker;
