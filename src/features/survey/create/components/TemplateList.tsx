import { TemplateBox } from "./TemplateBox";

interface TemplateListProps {
  templates: Record<string, string>;
  ariaLabel: string;
  gridClassNames: string;
  basePath?: string;
}

/**
 * 템플릿 목록 컴포넌트
 * 템플릿들을 그리드 형태로 표시
 * @param templates - 템플릿 객체 (키: 이름, 값: 경로)
 * @param ariaLabel - 접근성을 위한 레이블
 * @param gridClassNames - 그리드 클래스명
 * @param basePath - 기본 경로 (기본: "/create")
 */
export function TemplateList({
  templates,
  ariaLabel,
  gridClassNames,
  basePath = "/create",
}: TemplateListProps) {
  return (
    <ul className={gridClassNames} aria-label={ariaLabel}>
      {Object.entries(templates).map(([key, value]) => (
        <TemplateBox key={key} link={`${basePath}${value}`} text={key} />
      ))}
    </ul>
  );
}
