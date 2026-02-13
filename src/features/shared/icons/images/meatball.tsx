import type { IconProps } from "@/features/shared/icons";

export default function MeatballIcon({
  title,
  color = "currentColor",
  fill = "none",
  width = 20,
  height = 20,
  ...props
}: IconProps) {
  const titleId = title ? "meatball-icon-title" : undefined;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill={fill}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-labelledby={titleId}
      {...props}
    >
      {title && <title id={titleId}>{title}</title>}
      <path
        d="M11.992 12H12.001"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9842 18H11.9932"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9998 6H12.0088"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
