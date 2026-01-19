import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  linkHref?: string;
  linkLabel?: string;
}

export default function SectionHeader({
  title,
  linkHref,
  linkLabel = "모든 설문 보기 →",
}: SectionHeaderProps) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <h2 className="title2">{title}</h2>
      {linkHref && linkLabel && (
        <Link href={linkHref} className="caption">
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
