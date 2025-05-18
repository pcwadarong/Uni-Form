export default function BookMark({
  fill = "none",
  stroke = "currentColor",
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="24"
      height="24"
      fill={fill}
      stroke={stroke}
      {...props}
    >
      <path
        d="M24 28L16 23L8 28V6C8 5.73478 8.10536 5.48043 8.29289 5.29289C8.48043 5.10536 8.73478 5 9 5H23C23.2652 5 23.5196 5.10536 23.7071 5.29289C23.8946 5.48043 24 5.73478 24 6V28Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}