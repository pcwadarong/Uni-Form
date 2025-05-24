import FormCardItem from "@/components/form/formCardItem";
import { fetchUserDataServer } from "@/lib/firebase/user/fetchUserDataServer";
import type { UserParticipationFields } from "@/types/userType";

export default async function Page() {
  const { bookmarks, responses } = (await fetchUserDataServer({
    field: "participation",
  })) as UserParticipationFields;

  return <div>북마크, 답변한 설문</div>;
}
