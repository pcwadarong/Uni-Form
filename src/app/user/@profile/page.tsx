import { fetchUserDataServer } from "@/lib/firebase/user/getServer";

export default async function Page() {
  const data = await fetchUserDataServer({ field: "profile" });
  return <div>회원정보 수정</div>;
}
