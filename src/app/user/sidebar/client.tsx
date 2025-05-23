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
    <aside className="...">
      <div className="text-center mb-6">
        <div className="overflow-hidden rounded-full bg-gray-300 relative">
          <Image
            src={profileURL || "/preview.jpg"}
            alt="profile image"
            fill
            sizes="120px"
            className="object-cover"
          />
        </div>
        <p className="font-semibold mt-2">{nickname}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
      <ul className="...">
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
