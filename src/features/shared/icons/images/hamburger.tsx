import type { IconProps } from "../";

export default function HamburgerIcon({
  title,
  color = "currentColor",
  fill = "none",
  width = 20,
  height = 20,
  ...props
}: IconProps) {
  const titleId = title ? "hamburger-icon-title" : undefined;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill={fill}
      stroke={color}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-labelledby={titleId}
      {...props}
    >
      {title && <title id={titleId}>{title}</title>}
      <path d="M20 12H10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 5H4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 19H4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
