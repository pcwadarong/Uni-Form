import { type UserActivityFields, fetchUserDataServer } from "@/lib/firebase/user/getServer";

export default async function Page() {
  const { comments, createdForms, drafts } = (await fetchUserDataServer({
    field: "activity",
  })) as UserActivityFields;
  return <div>내 활동 보기</div>;
}
