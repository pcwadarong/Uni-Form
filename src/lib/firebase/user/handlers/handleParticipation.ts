// responded Forms + bookmarked Forms

import { adminFirestore } from "@/lib/firebase/firebaseAdminConfig";
import { batchQueryByIds } from "@/lib/utils/batchQueryByIds";
import type { Form } from "@/types/types";
import type { UserParticipationFields } from "@/types/userType";

export const handleParticipation = async (
  uid: string,
  bookmarks: string[],
): Promise<UserParticipationFields> => {
  const responsesSnap = await adminFirestore
    .collection("responses")
    .where("uid", "==", uid)
    .orderBy("createdAt", "desc")
    .get();

  const formIds = responsesSnap.docs.map((doc) => doc.data().formId as string);
  const surveys = await batchQueryByIds("surveys", formIds);
  const recruits = await batchQueryByIds("recruits", formIds);
  const forms = [...surveys, ...recruits];
  const responses: Form[] = formIds
    .map((formId) => forms.find((form) => form.id === formId))
    .filter((f): f is Form => !!f);

  const bookmarkSurveys = await batchQueryByIds("surveys", bookmarks);
  const bookmarkRecruits = await batchQueryByIds("recruits", bookmarks);
  const bookmarksResult = [...bookmarkSurveys, ...bookmarkRecruits];

  return {
    responses,
    bookmarks: bookmarksResult,
  };
};
