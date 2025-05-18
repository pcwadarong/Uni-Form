export default function SunIcon({
  stroke = "currentColor",
  width = 20,
  height = 20,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <g clipPath="url(#clip0)">
        <circle cx="10" cy="10" r="4" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
        <path d="M18 10H19" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        <path d="M1 10H2" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        <path d="M10 18V19" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        <path d="M10 1V2" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        <path
          d="M15.6567 15.6569L16.3638 16.364"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M3.63623 3.63599L4.34334 4.34309"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M4.34326 15.6569L3.63615 16.364"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M16.3638 3.63599L15.6567 4.34309"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
