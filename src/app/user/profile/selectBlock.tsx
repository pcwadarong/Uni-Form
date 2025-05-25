import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FormFieldProps } from "@/types/userType";
import FormBlock from "./formBlock";

export default function SelectBlock({
  label,
  options,
  error,
  value,
  ...props
}: FormFieldProps & { options: readonly string[]; value?: string }) {
  const selectId = `select-${label}`;
  return (
    <FormBlock label={label} htmlFor={selectId} error={error?.message}>
      <Select {...props} defaultValue={value}>
        <SelectTrigger
          id={selectId}
          className="w-full mt-2 py-4 text-content bg-muted dark:bg-surface"
        >
          <SelectValue placeholder="선택해주세요" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormBlock>
  );
}
