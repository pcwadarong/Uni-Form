"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { label: "회원정보 수정", href: "/user/profile" },
  { label: "북마크, 답변한 설문", href: "/user/created" },
  { label: "내 활동 보기", href: "/user/activity" },
  { label: "내가 만든 설문", href: "/user/participation" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="p-4 w-60">
      <ul className="space-y-4">
        {menu.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className={clsx(
                "block font-medium hover:text-green-400 transition",
                pathname === href && "text-green-400",
              )}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
