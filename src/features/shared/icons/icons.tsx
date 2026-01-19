import type React from "react";
import { IconMap, type IconMapTypes, type IconSizeTypes, IconSizes } from "../icons";

interface SVGIconProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
  name: IconMapTypes;
  size?: IconSizeTypes | number;
  color?: string;
}

const SVGIcon = ({
  title,
  name,
  size = "md",
  color = "currentColor",
  fill = "none",
  className,
  style,
  ...props
}: SVGIconProps) => {
  const Icon = IconMap[name];

  if (!Icon) return null;

  // size가 sm, md 같은 키일 경우 IconSizes에서 찾고, 숫자일 경우 그대로 사용
  const pixelSize =
    typeof size === "string" && size in IconSizes
      ? IconSizes[size as IconSizeTypes]
      : typeof size === "number"
        ? size
        : IconSizes.md;

  return (
    <Icon
      title={title}
      className={className}
      color={color}
      fill={fill}
      width={pixelSize}
      height={pixelSize}
      style={style}
      {...props}
    />
  );
};

export default SVGIcon;
