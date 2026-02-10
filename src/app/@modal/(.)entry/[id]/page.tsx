import Modal from "@/features/shared/ui/modal";
import { CommentsSection } from "@/features/survey/entry/components/modal/CommentsSection";
import { FormContent } from "@/features/survey/entry/components/modal/FormContent";
import { ViewDetailButton } from "@/features/survey/entry/components/modal/ViewDetailButton";

import { fetchCommentsServer } from "@/lib/firebase/comment/getCommentsServer";
import { fetchForm } from "@/lib/firebase/form/getFormServer";
import { decrypt } from "@/lib/utils/crypoto";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

/**
 * 엔트리 상세 페이지를 모달로 표시하는 페이지 컴포넌트
 * Intercepting Routes를 사용하여 클라이언트 네비게이션 시 모달로 표시됨
 * @param params - 암호화된 폼 ID를 포함한 라우트 파라미터
 */
export default async function EntryIntercept({ params }: { params: Promise<{ id: string }> }) {
  const { id: encryptedId } = await params;
  const itemId = await decrypt(encryptedId, process.env.CRYPT_SECRET || "");
  if (!itemId) return notFound();

  const type = itemId.startsWith("survey") ? "surveys" : "recruits";
  const item = await fetchForm(type, itemId);
  const { comments: initialComments } = await fetchCommentsServer(item.id, 3);

  return (
    <div>
      <Modal>
        <FormContent item={item} />
        <CommentsSection comments={initialComments} />
        <ViewDetailButton encryptedId={encryptedId} />
      </Modal>
    </div>
  );
}
