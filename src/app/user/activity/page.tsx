import { fetchUserDataServer } from "@/lib/firebase/user/fetchUserDataServer";
import type { UserActivityFields } from "@/types/userType";

export default async function Page() {
  const { comments, createdForms, drafts } = (await fetchUserDataServer({
    field: "activity",
  })) as UserActivityFields;
  return <div>내 활동 보기</div>;
}
