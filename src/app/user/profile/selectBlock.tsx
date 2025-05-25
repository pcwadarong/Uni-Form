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
  ...props
}: FormFieldProps & { options: readonly string[] }) {
  const selectId = `select-${label}`;
  return (
    <FormBlock label={label} htmlFor={selectId} error={error?.message}>
      <Select {...props}>
        <SelectTrigger
          id={selectId}
          className="w-full mt-2 py-4 text-content bg-muted dark:bg-surface"
        >
          <SelectValue placeholder="선택" />
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
