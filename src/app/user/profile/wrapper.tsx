import { fetchUserFullProfile } from "@/lib/firebase/user/fetchUserFullProfile";
import ClientProfileForm from "./form";

export default async function Wrapper() {
  const profile = await fetchUserFullProfile();
  if (!profile) return <div>사용자 정보를 불러올 수 없습니다.</div>;

  return <ClientProfileForm profile={profile} />;
}
