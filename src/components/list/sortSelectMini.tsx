import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SortSelectProps {
  onChangeSortType: (value: string) => void;
}

const SortSelectMini: React.FC<SortSelectProps> = ({ onChangeSortType }) => {
  const options = [
    { value: 'date-desc', label: '최신 순' },
    { value: 'random', label: '랜덤 순' },
    // { value: 'update-asc', label: '끌올 순' }, // 부가 기능으로 업데이트 예정
  ];

  return (
    <Select defaultValue="date-desc" onValueChange={onChangeSortType}>
      <SelectTrigger className="border-gray-2 w-36">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} role="option">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SortSelectMini;
