"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { label: "회원정보 수정", href: "/user/profile" },
  { label: "북마크, 답변한 설문", href: "/user/participation" },
  { label: "내 활동 보기", href: "/user/activity" },
];

type Props = {
  nickname?: string;
  profileURL?: string | null;
  email?: string | null;
};

export default function SidebarClient({ nickname, profileURL, email }: Props) {
  const pathname = usePathname();

  return (
    <aside
      aria-label="사용자 사이드바 메뉴"
      className="w-full bg-tone1 text-center text-nowrap px-8 lg:w-88 lg:h-dvh lg:-mt-20 lg:pt-40"
      style={{ boxShadow: "4px 0 6px rgba(0,0,0,0.1)" }}
    >
      <div className="m-auto hidden w-fit lg:block">
        <div className="relative overflow-hidden rounded-full bg-gray-300">
          <Image
            src={profileURL || "/preview.jpg"}
            alt={`${nickname ?? "사용자"}의 프로필 이미지`}
            width={100}
            height={100}
            className="h-full w-full object-cover"
          />
        </div>
        <p className="mt-4 font-semibold title3">{nickname}</p>
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
                  "block box-content py-4 font-medium text-content/50 transition-colors duration-200 border-b-2 lg:p-0 hover:text-green-400",
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
