import type React from "react";
import { IconMap, type IconMapTypes, type IconSizeTypes, IconSizes } from "../icons";

interface SVGIconProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
  name: IconMapTypes;
  size?: IconSizeTypes | number;
  color?: string;
}

/**
 * 통합 SVG 아이콘 컴포넌트
 * IconMap에서 아이콘을 가져와 렌더링
 * @param name - 아이콘 이름
 * @param size - 아이콘 크기 (키워드 또는 픽셀)
 * @param color - 아이콘 색상
 * @param className - 추가 CSS 클래스
 * @param props - 기타 SVG 속성
 */
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
