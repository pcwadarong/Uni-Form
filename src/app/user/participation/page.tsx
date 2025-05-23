import { type UserParticipationFields, fetchUserDataServer } from "@/lib/firebase/user/getServer";

export default async function Page() {
  const { bookmarks, responses } = (await fetchUserDataServer({
    field: "participation",
  })) as UserParticipationFields;

  return <div>북마크, 답변한 설문</div>;
}
