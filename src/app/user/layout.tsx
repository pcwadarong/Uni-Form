import Link from "next/link";
import type { ReactNode } from "react";

export default function Layout({
  children,
  sidebar,
  profile,
  participation,
  activity,
}: {
  sidebar: ReactNode;
  children: ReactNode;
  profile: ReactNode;
  participation: ReactNode;
  activity: ReactNode;
}) {
  return (
    <div className="">
      {sidebar}
      {/* <Sidebar /> */}
      <div>
        <Link href={"/user/profile"}>프로필로 이동</Link>
        &nbsp;
        <Link href={"/user/profile/setting"}>프로필 세팅으로 이동</Link>
      </div>
      <br />
      <main>
        {children}
        {profile ?? null}
        {/* {participation ?? null}
        {activity ?? null} */}
      </main>
    </div>
  );
}
