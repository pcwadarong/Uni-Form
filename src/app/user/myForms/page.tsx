import { MyFormsSection } from "@/features/user/components/MyFormsSection";
import type { UserActivityFields } from "@/features/user/types";
import { fetchUserDataServer } from "@/lib/firebase/user/fetchUserDataServer";

/**
 * 내가 만든 폼 페이지
 * API 호출 처리 및 UI 컴포넌트에 데이터 전달
 */
export default async function Page() {
  const { createdForms, drafts } = (await fetchUserDataServer({
    field: "myForms",
  })) as UserActivityFields;

  return (
    <>
      <MyFormsSection
        title="내가 만든 설문과 공고"
        forms={createdForms}
        linkHref="/created"
        emptyMessage="생성한 설문이 없습니다. 새롭게 만들어보세요!"
      />

      <MyFormsSection
        title="임시 저장한 설문과 공고"
        forms={drafts}
        linkHref="/draft"
        emptyMessage="임시 저장된 설문이 없습니다. 작성을 시작해보세요!"
      />
    </>
  );
}
