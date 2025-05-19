import { cn } from "@/lib/utils";
import { ko } from "date-fns/locale";
import { DayPicker } from "react-day-picker";

type CalendarProps = React.ComponentProps<typeof DayPicker>;

export default function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  locale = ko,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={locale}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-content dark:text-content rounded-md w-9 text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: [
          "h-9 w-9 text-center text-sm p-0 relative",
          "[&:has([aria-selected].day-range-end)]:rounded-r-md",
          "[&:has([aria-selected].day-outside)]:bg-gray-100/50",
          "[&:has([aria-selected])]:bg-gray-100",
          "first:[&:has([aria-selected])]:rounded-l-md",
          "last:[&:has([aria-selected])]:rounded-r-md",
          "focus-within:relative focus-within:z-20",
          "dark:[&:has([aria-selected].day-outside)]:bg-gray-800/50",
          "dark:[&:has([aria-selected])]:bg-gray-800",
        ].join(" "),
        day: "h-9 w-9 p-0 aria-selected:opacity-100 hover:bg-gray-200 rounded-full",
        day_range_end: "day-range-end",
        day_selected: [
          "bg-green-light text-green-400",
          "focus:bg-tone1-reverse focus:text-tone1",
          "dark:bg-gray-50 dark:text-gray-900",
          "dark:hover:bg-gray-50 dark:hover:text-gray-900",
          "dark:focus:bg-gray-50 dark:focus:text-gray-900",
        ].join(" "),
        day_today: "bg-gray-100 rounded-full dark:bg-gray-800 dark:text-content",
        day_outside: [
          "day-outside text-gray-400",
          "aria-selected:bg-gray-100/50 aria-selected:text-gray-500 aria-selected:opacity-30",
          "dark:text-gray-400 dark:aria-selected:bg-gray-800/50 dark:aria-selected:text-gray-400",
        ].join(" "),
        day_disabled: "text-gray-300 dark:text-gray-400",
        day_range_middle: [
          "aria-selected:bg-gray-100 aria-selected:text-gray-900",
          "dark:aria-selected:bg-gray-800 dark:aria-selected:text-gray-50",
        ].join(" "),
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <span className="h-4 w-4">{"<"}</span>,
        IconRight: () => <span className="h-4 w-4">{">"}</span>,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";
