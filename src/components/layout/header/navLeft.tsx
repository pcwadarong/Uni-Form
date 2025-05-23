"use client";

import BrandLogo from "@/components/svg/logo";
import Link from "next/link";

interface Props {
  handleMouseOver: (category: string) => void;
  handleMouseLeave: () => void;
}

export default function NavLeft({ handleMouseOver, handleMouseLeave }: Props) {
  return (
    <ul className="flex items-center gap-6 md:gap-8">
      <li>
        <h1>
          <Link href="/">
            <BrandLogo width={48} />
          </Link>
        </h1>
      </li>
      <li
        className="hidden sm:inline decoration-green-300 underline-offset-8 hover:underline"
        onMouseOver={() => handleMouseOver("survey")}
        onFocus={() => handleMouseOver("survey")}
        onMouseLeave={handleMouseLeave}
        onBlur={handleMouseLeave}
      >
        <Link href="/survey?cat=all">설문조사</Link>
      </li>
      <li
        className="hidden sm:inline decoration-green-300 underline-offset-8 hover:underline"
        onMouseOver={() => handleMouseOver("recruit")}
        onFocus={() => handleMouseOver("recruit")}
        onMouseLeave={handleMouseLeave}
        onBlur={handleMouseLeave}
      >
        <Link href="/recruit?cat=all">모집공고</Link>
      </li>
    </ul>
  );
}
