import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSortHandler } from "@/hooks/useSortHandler";

interface SortSelectProps {
  defaultValue?: string;
  variant?: "full" | "mini";
}

const optionSet = {
  full: [
    { value: "point-asc", label: "리워드 높은 순" },
    { value: "random", label: "랜덤 순" },
    { value: "popular-asc", label: "인기 순" },
    { value: "date-desc", label: "최신 순" },
    // { value: "update-asc", label: "끌올 순" },
  ],
  mini: [
    { value: "date-desc", label: "최신 순" },
    { value: "random", label: "랜덤 순" },
  ],
};

export default function SortSelect({
  defaultValue = "date-desc",
  variant = "full",
}: SortSelectProps) {
  const onChangeSortType = useSortHandler;
  const options = optionSet[variant];

  return (
    <Select value={defaultValue} onValueChange={onChangeSortType}>
      <SelectTrigger className="border-gray-2 w-36">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
