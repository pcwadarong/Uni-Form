import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/features/shared/ui/select";
import { useSortHandler } from "@/features/survey/list/hooks/useSortHandler";

interface SortSelectProps {
  defaultValue?: string;
  variant?: "full" | "mini";
}

/**
 * 정렬 옵션 설정
 */
const OPTION_SET = {
  full: [
    { value: "point-asc", label: "리워드 높은 순" },
    { value: "random", label: "랜덤 순" },
    { value: "popular-asc", label: "인기 순" },
    { value: "date-desc", label: "최신 순" },
  ],
  mini: [
    { value: "date-desc", label: "최신 순" },
    { value: "random", label: "랜덤 순" },
  ],
} as const;

/**
 * 정렬 선택 컴포넌트
 * 설문/모집 목록의 정렬 기준을 선택
 * @param defaultValue - 기본 선택값
 * @param variant - 정렬 옵션 세트 (full 또는 mini)
 */
export default function SortSelect({
  defaultValue = "date-desc",
  variant = "full",
}: SortSelectProps) {
  const { onChangeSortType } = useSortHandler();
  const options = OPTION_SET[variant];

  return (
    <Select value={defaultValue} onValueChange={onChangeSortType}>
      <SelectTrigger className="w-36 border-gray-400">
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
