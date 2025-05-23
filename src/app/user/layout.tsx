import type { ReactNode } from "react";
import Sidebar from "./sidebar";

export default function Layout({
  children,
  profile,
  participation,
  activity,
  created,
}: {
  children: ReactNode;
  profile: ReactNode;
  created: ReactNode;
  participation: ReactNode;
  activity: ReactNode;
}) {
  return (
    <div>
      <Sidebar />
      <main>
        {children}
        {profile}
        {created}
        {participation}
        {activity}
      </main>
    </div>
  );
}
