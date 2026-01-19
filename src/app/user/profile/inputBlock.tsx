import { Input } from "@/components/ui/input";
import type { FormFieldProps } from "@/types/userType";
import FormBlock from "./formBlock";

export default function InputBlock({ label, error, isPending, ...props }: FormFieldProps) {
  const inputId = `input-${label}`;
  return (
    <FormBlock label={label} htmlFor={inputId} error={error?.message}>
      <Input
        id={inputId}
        type="text"
        className="mt-2 w-full bg-muted dark:bg-surface"
        disabled={isPending}
        {...props}
      />
    </FormBlock>
  );
}
