import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SortSelectProps {
  onChangeSortType: (value: string) => void;
  defaultValue: string;
}

const SortSelect: React.FC<SortSelectProps> = ({ onChangeSortType, defaultValue }) => {
  return (
    <Select value={defaultValue} onValueChange={onChangeSortType}>
      <SelectTrigger className="border-gray-2 w-36">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {/* <option value="update-asc">끌올 순</option> */}
        <SelectItem value="point-asc">리워드 높은 순</SelectItem>
        <SelectItem value="random">랜덤 순</SelectItem>
        <SelectItem value="popular-asc">인기 순</SelectItem>
        <SelectItem value="date-desc">최신 순</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortSelect;

//끌올의 경우 부가 기능으로 업데이트 예정
