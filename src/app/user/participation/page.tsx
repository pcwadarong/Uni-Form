import { ParticipationSection } from "@/features/user/components/ParticipationSection";
import type { UserParticipationFields } from "@/features/user/types";
import { fetchUserDataServer } from "@/lib/firebase/user/fetchUserDataServer";

/**
 * 참여 페이지
 * API 호출 처리 및 UI 컴포넌트에 데이터 전달
 */
export default async function Page() {
  const { bookmarks, responses } = (await fetchUserDataServer({
    field: "participation",
  })) as UserParticipationFields;

  return (
    <div>
      <ParticipationSection
        title="북마크한 설문과 공고"
        forms={bookmarks}
        linkHref="/bookmarks"
        emptyMessage="북마크한 리스트가 없습니다. 새롭게 추가해보세요!"
      />

      <ParticipationSection
        title="답변한 설문과 공고"
        forms={responses}
        linkHref="/responded"
        emptyMessage="아직 답변한 설문이 없습니다. 참여해보세요!"
      />
    </div>
  );
}
