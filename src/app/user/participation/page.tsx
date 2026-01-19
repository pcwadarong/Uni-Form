import FormCardItem from "@/features/survey/form/components/formCardItem";
import { fetchUserDataServer } from "@/lib/firebase/user/fetchUserDataServer";
import type { UserParticipationFields } from "@/types/userType";
import Link from "next/link";

export default async function Page() {
  const { bookmarks, responses } = (await fetchUserDataServer({
    field: "participation",
  })) as UserParticipationFields;

  return (
    <div>
      <section>
        <h2>북마크한 설문과 공고</h2>
        <Link href="/bookmarks">모든 설문 보기</Link>
        <ul>
          {bookmarks.length > 0 ? (
            bookmarks.map((item) => {
              const type = item.id.startsWith("survey") ? "survey" : "recruit";
              return (
                <li key={item.id}>
                  <FormCardItem type={type} item={item} />
                </li>
              );
            })
          ) : (
            <p>
              북마크한 리스트가 없습니다. <br /> 새롭게 추가해보세요!
            </p>
          )}
        </ul>
      </section>

      <section>
        <h2>답변한 설문과 공고</h2>
        <Link href="/responded">모든 설문 보기</Link>
        <ul>
          {responses.length > 0 ? (
            responses.map((item) => {
              const type = item.id.startsWith("survey") ? "survey" : "recruit";
              return (
                <li key={item.id}>
                  <FormCardItem type={type} item={item} />
                </li>
              );
            })
          ) : (
            <p>
              아직 답변한 설문이 없습니다. <br /> 참여해보세요!
            </p>
          )}
        </ul>
      </section>
    </div>
  );
}
