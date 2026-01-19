import type { IconProps } from "../types";

export default function SunIcon({
  title,
  color = "currentColor",
  width = 20,
  height = 20,
  ...props
}: IconProps) {
  const titleId = title ? "sun-icon-title" : undefined;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-labelledby={titleId}
      {...props}
    >
      {title && <title id={titleId}>{title}</title>}
      <g clipPath="url(#clip0_sun)">
        <circle cx="10" cy="10" r="4" stroke={color} strokeWidth="2" strokeLinejoin="round" />
        <path d="M18 10H19" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M1 10H2" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M10 18V19" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M10 1V2" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path
          d="M15.6567 15.6569L16.3638 16.364"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M3.63623 3.63599L4.34334 4.34309"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M4.34326 15.6569L3.63615 16.364"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M16.3638 3.63599L15.6567 4.34309"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_sun">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
