export default function BrandLogo({
  fill = "currentColor",
  width = 80,
  height = 53,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M77.9675 21.3978C77.9675 17.5213 74.8249 14.3788 70.9485 14.3788C70.2914 14.3788 69.7588 14.9114 69.7588 15.5684V39.6954L44.7907 3.39133C43.6044 1.66636 41.645 0.635864 39.5514 0.635864H33.7963C33.0837 0.635864 32.5101 1.22137 32.5248 1.93386L32.8172 16.0994L32.6294 32.0159C32.6294 39.1985 27.5674 44.3973 20.4532 44.3973C13.2707 44.3973 8.27707 39.1985 8.27707 32.0159V2.41242C8.27707 1.87462 7.84109 1.43865 7.30329 1.43865C3.26979 1.43865 0 4.70844 0 8.74194V32.0843C0 43.5764 9.43996 52.8112 20.4532 52.8112C31.3981 52.8112 40.8381 43.5764 40.8381 32.0843V12.1504L65.3707 46.969C67.3854 49.8285 70.6649 51.5295 74.1628 51.5295H76.7467C77.4209 51.5295 77.9675 50.983 77.9675 50.3088V21.3978Z"
        fill={fill}
      />
      <path
        d="M5.72296 23.5273H22.0995"
        stroke={fill}
        strokeWidth="5.08703"
        strokeLinecap="round"
      />
      <path
        d="M4.45111 32.4297H18.92"
        stroke={fill}
        strokeWidth="5.08703"
        strokeLinecap="round"
      />
      <circle cx="74.1991" cy="5.28574" r="5.28574" fill={fill} />
    </svg>
  );
}
