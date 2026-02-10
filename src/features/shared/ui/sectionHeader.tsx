import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  linkHref?: string;
  linkLabel?: string;
  headingId?: string;
}

export default function SectionHeader({
  title,
  linkHref,
  linkLabel = "모든 설문 보기 →",
  headingId,
}: SectionHeaderProps) {
  return (
    <header className="mb-6 flex items-end justify-between">
      <h2 id={headingId} className="title2">
        {title}
      </h2>
      {linkHref && linkLabel && (
        <Link href={linkHref} className="caption">
          {linkLabel}
        </Link>
      )}
    </header>
  );
}
