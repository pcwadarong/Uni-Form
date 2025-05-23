import { fetchAuthUserInfo } from "@/lib/firebase/user/getServer";
import SidebarClient from "./client";

export default async function Sidebar() {
  const authInfo = await fetchAuthUserInfo();

  return (
    <SidebarClient
      nickname={authInfo?.displayName || "username"}
      profileURL={authInfo?.photoURL || null}
      email={authInfo?.email || null}
    />
  );
}
