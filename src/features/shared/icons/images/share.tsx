import type { IconProps } from "../types";

export default function ShareIcon({
  title,
  color = "currentColor",
  fill = "none",
  width = 24,
  height = 24,
  ...props
}: IconProps) {
  const titleId = title ? "share-icon-title" : undefined;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
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
      <path
        d="M8 20C10.2091 20 12 18.2091 12 16C12 13.7909 10.2091 12 8 12C5.79086 12 4 13.7909 4 16C4 18.2091 5.79086 20 8 20Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 29C24.2091 29 26 27.2091 26 25C26 22.7909 24.2091 21 22 21C19.7909 21 18 22.7909 18 25C18 27.2091 19.7909 29 22 29Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 11C24.2091 11 26 9.20914 26 7C26 4.79086 24.2091 3 22 3C19.7909 3 18 4.79086 18 7C18 9.20914 19.7909 11 22 11Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.6373 9.16248L11.3623 13.8375"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.3623 18.1625L18.6373 22.8375"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
