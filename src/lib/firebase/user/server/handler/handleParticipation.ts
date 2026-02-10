// responded Forms + bookmarked Forms

import { adminFirestore } from "@/lib/firebase/firebaseAdminConfig";
import { batchQueryByIds } from "@/lib/utils/batchQueryByIds";
import type { Form } from "@/types";
import type { UserParticipationFields } from "@/types";

/**
 * 참여한 설문/북마크 폼 목록을 조회한다.
 * @param uid - 사용자 UID
 * @param bookmarks - 북마크된 폼 ID 목록
 * @returns 참여/북마크 데이터
 */
export const handleParticipation = async (
  uid: string,
  bookmarks: string[],
): Promise<UserParticipationFields> => {
  const responsesSnap = await adminFirestore
    .collection("responses")
    .where("uid", "==", uid)
    .orderBy("createdAt", "desc")
    .limit(3)
    .get();

  const formIds = responsesSnap.docs.map((responseDoc) => responseDoc.data().formId as string);
  const forms = await batchQueryByIds("forms", formIds);

  const responses: Form[] = formIds
    .map((formId: string) => forms.find((form) => form.id === formId))
    .filter((form): form is Form => !!form);

  const bookmarksResult = await batchQueryByIds("forms", bookmarks);

  return {
    responses,
    bookmarks: bookmarksResult,
  };
};
