import { fetchUserFullProfile } from "@/lib/firebase/user/fetchUserFullProfile";

export default async function Page() {
  const data = await fetchUserFullProfile();
  return <div>회원정보 수정</div>;
}
