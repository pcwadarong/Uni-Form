import { fetchUserDataServer } from "@/lib/firebase/user/getServer";
import { getServerUid } from "@/lib/firebase/user/getServerUid";
import type { User } from "@/types";
import { notFound } from "next/navigation";

export default async function Page() {
  const uid = await getServerUid();
  if (!uid) return notFound();
  const data = (await fetchUserDataServer("all")) as User;
  return <div>회원정보 수정</div>;
}
