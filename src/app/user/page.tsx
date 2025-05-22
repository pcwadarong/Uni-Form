import { fetchUserDataServer } from "@/lib/firebase/user/getServer";
import { getServerUid } from "@/lib/firebase/user/getServerUid";
import type { User } from "@/types";
import { notFound } from "next/navigation";

export default async function Account() {
  const uid = await getServerUid();
  if (!uid) return notFound();
  const data = (await fetchUserDataServer("all")) as User;
  return (
    <div className="m-auto text-center">
      {data ? `안녕하세요 ${data.nickname}님` : "사용자 정보를 불러올 수 없습니다."}
    </div>
  );
}
