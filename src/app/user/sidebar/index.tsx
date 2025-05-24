import { fetchUserAuthInfo } from "@/lib/firebase/user/fetchUserAuthInfo";
import SidebarClient from "./client";

export default async function Sidebar() {
  const authInfo = await fetchUserAuthInfo();

  return (
    <SidebarClient
      displayName={authInfo?.displayName || "username"}
      profileURL={authInfo?.photoURL || null}
      email={authInfo?.email || null}
    />
  );
}
