import type { IconProps } from "../";

export default function CancelIcon({
  title,
  color = "currentColor",
  fill = "none",
  width = 20,
  height = 20,
  ...props
}: IconProps) {
  const titleId = title ? "cancel-icon-title" : undefined;

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
        d="M19.0005 4.99988L5.00045 18.9999M5.00045 4.99988L19.0005 18.9999"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
