import ActionButtons from "@/features/shared/ui/actionButtons";
import { EntryAside } from "@/features/survey/entry/components/EntryAside";
import { EntryCommentSection } from "@/features/survey/entry/components/EntryCommentSection";
import { EntryHeader } from "@/features/survey/entry/components/EntryHeader";
import { MobileImage } from "@/features/survey/entry/components/MobileImage";
import SimilarForms from "@/features/survey/entry/components/similarForms";

import { getServerUid } from "@/lib/firebase/auth/getServerUid";
import { fetchCommentsServer } from "@/lib/firebase/comment/getCommentsServer";
import { fetchForm } from "@/lib/firebase/form/getFormServer";
import { handleAnsweredFormIds } from "@/lib/firebase/user/server/handler/handleAnsweredFormIds";
import { decrypt } from "@/lib/utils/crypoto";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

/**
 * 엔트리 상세 페이지 컴포넌트
 * 폼의 상세 정보, 댓글, 관련 폼들을 표시
 * @param params - 암호화된 폼 ID를 포함한 라우트 파라미터
 */
export default async function Entry({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 주소창 해석해서 formId 알아내기
  const { id: encryptedId } = await params;
  const itemId = await decrypt(encryptedId, process.env.CRYPT_SECRET || "");
  if (!itemId) return notFound();

  // 해당하는 doc에서 데이터 가져오기
  const type = itemId.startsWith("survey") ? "surveys" : "recruits";
  const item = await fetchForm(type, itemId);

  // 초기 댓글 5개 + 1개 매칭하여 가져오기
  const {
    comments: initialComments,
    lastDocId,
    hasNextPage: initialHasNextPage,
    totalCount,
  } = await fetchCommentsServer(item.id, 5);

  // 현재 로그인한 사용자가 대답한 설문인지 확인하기
  const currentUid = await getServerUid();
  const answeredFormIds = currentUid ? await handleAnsweredFormIds(currentUid) : [];
  const hasAnswered = answeredFormIds.includes(item.id);

  return (
    <div className="my-auto w-full max-w-300 space-y-20 bg-surface px-14 pt-16 pb-10 shadow dark:bg-muted">
      <section className="flex flex-col gap-10 md:flex-row">
        <MobileImage img={item.img ?? ""} />

        <main className="flex flex-col justify-between">
          <EntryHeader item={item} type={type} />
          <ActionButtons />
        </main>

        <EntryAside item={item} encryptedId={encryptedId} hasAnswered={hasAnswered} />
      </section>

      <EntryCommentSection
        item={item}
        initialComments={initialComments}
        lastDocId={lastDocId}
        initialHasNextPage={initialHasNextPage}
        totalCount={totalCount}
      />

      <SimilarForms itemId={itemId} category={item.category} />
    </div>
  );
}
