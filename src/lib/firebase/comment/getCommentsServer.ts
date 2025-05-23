// 댓글 리스트 - entry에서 사용

import type { Comment } from "@/types/types";
import { FirebaseError } from "firebase/app";
import { adminFirestore } from "../firebaseAdminConfig";
import { fetchUserNicknameServer } from "../user/fetchUserNicknameServer";

export const fetchCommentsServer = async (
  id: string,
  limitCount = 5,
): Promise<{
  comments: Comment[];
  lastDocId: string | null;
  hasNextPage: boolean;
  totalCount: number;
}> => {
  try {
    const snapshot = await adminFirestore
      .collection("comments")
      .where("formId", "==", id)
      .orderBy("createdAt", "desc")
      .orderBy("__name__", "desc")
      .limit(limitCount + 1)
      .get();

    if (snapshot.empty)
      return {
        comments: [],
        lastDocId: null,
        hasNextPage: false,
        totalCount: 0,
      };

    const docs = snapshot.docs;
    const hasNextPage = docs.length > limitCount;
    const sliced = hasNextPage ? docs.slice(0, limitCount) : docs;

    const commentsWithNicknames = await Promise.all(
      sliced.map(async (doc) => {
        const data = doc.data();
        const nickname = await fetchUserNicknameServer(data.uid);

        return {
          id: doc.id,
          formId: data.formId,
          uid: data.uid,
          content: data.content,
          createdAt: data.createdAt?.toMillis?.() ?? null,
          nickname: typeof nickname === "string" ? nickname : "",
        };
      }),
    );

    const countSnap = await adminFirestore
      .collection("comments")
      .where("formId", "==", id)
      .count()
      .get();

    const totalCount = countSnap.data().count || 0;

    return {
      comments: commentsWithNicknames,
      lastDocId: hasNextPage ? docs[limitCount - 1].id : null,
      hasNextPage,
      totalCount,
    };
  } catch (err) {
    if (err instanceof FirebaseError) throw new Error(`Firebase loading error: ${err.code}`);

    throw err;
  }
};
