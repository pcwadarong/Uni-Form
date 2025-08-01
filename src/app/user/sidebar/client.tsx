"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { label: "프로필 수정", href: "/user/profile" },
  { label: "북마크, 나의 답변", href: "/user/participation" },
  { label: "내가 만든 설문", href: "/user/myForms" },
  { label: "작성한 댓글", href: "/user/myComments" },
];

type Props = {
  displayName?: string;
  profileURL?: string | null;
  email?: string | null;
};

export default function SidebarClient({ displayName, profileURL, email }: Props) {
  const pathname = usePathname();

  return (
    <aside
      aria-label="사용자 사이드바 메뉴"
      className="w-full bg-tone1 text-center text-nowrap px-8 lg:w-88 lg:h-dvh lg:-mt-20 lg:pt-40 lg:shadow-[4px_0_6px_rgba(0,0,0,0.1)]"
    >
      <div className="m-auto hidden w-fit lg:block">
        <div className="relative overflow-hidden aspect-square rounded-full bg-gray-300 shadow">
          <Image
            src={profileURL || "/preview.jpg"}
            alt={`${displayName ?? "사용자"}의 프로필 이미지`}
            width={100}
            height={100}
            className="h-full w-full object-cover"
            priority={true}
          />
        </div>
        <p className="mt-4 font-semibold title3">{displayName}</p>
        <p className="caption text-sm text-content/50">{email}</p>
        <hr className="mt-6 mb-10 border-gray-300" />
      </div>

      <ul className="flex gap-3 lg:flex-col">
        {menu.map(({ label, href }) => {
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={clsx(
                  "block box-content py-4 font-medium text-content/50 transition-colors duration-200 border-b-2 lg:p-0 hover:text-green-400 lg:border-none",
                  isActive ? "text-green-400 border-green-400" : "border-transparent",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
