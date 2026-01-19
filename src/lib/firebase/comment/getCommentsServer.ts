import type { Comment } from "@/types";
import { FirebaseError } from "firebase/app";
import { adminFirestore } from "../firebaseAdminConfig";
import { fetchUserDisplayNameServer } from "../user/server/fetchUserDisplayNameServer";

/**
 * 서버에서 폼의 댓글 목록 조회 (페이지네이션 지원)
 * @param id - 폼 ID
 * @param limitCount - 조회할 댓글 수 (기본: 5)
 * @returns 댓글 목록, 마지막 문서 ID, 다음 페이지 존재 여부, 전체 개수
 */
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

    const commentsWithDisplayNames = await Promise.all(
      sliced.map(async (doc) => {
        const data = doc.data();
        const displayName = await fetchUserDisplayNameServer(data.uid);

        return {
          id: doc.id,
          formId: data.formId,
          uid: data.uid,
          content: data.content,
          createdAt: data.createdAt?.toMillis?.() ?? null,
          displayName: typeof displayName === "string" ? displayName : "",
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
      comments: commentsWithDisplayNames,
      lastDocId: hasNextPage ? docs[limitCount - 1].id : null,
      hasNextPage,
      totalCount,
    };
  } catch (err) {
    if (err instanceof FirebaseError) throw new Error(`Firebase loading error: ${err.code}`);

    throw err;
  }
};
