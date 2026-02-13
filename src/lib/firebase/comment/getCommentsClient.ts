import { toast } from "@/features/shared/ui/sonner";
import { firestore } from "@/lib/firebase/firebaseConfig";
import { fetchUserDisplayNameClient } from "@/lib/firebase/user/client/fetchUserDisplayNameClient";
import type { Comment } from "@/types";
import {
  type DocumentData,
  type QueryDocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";

export const getCommentSnapshotById = async (
  id: string,
): Promise<QueryDocumentSnapshot<DocumentData> | null> => {
  try {
    const ref = doc(firestore, "comments", id);
    const snap = await getDoc(ref);

    return snap.exists() ? (snap as QueryDocumentSnapshot<DocumentData>) : null;
  } catch {
    toast.error("댓글 스냅샷을 불러오지 못했습니다.");
    return null;
  }
};

export const fetchCommentsClient = async (
  id: string,
  pageSize = 5,
  lastVisible?: QueryDocumentSnapshot<DocumentData> | null,
): Promise<{
  comments: Comment[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
}> => {
  try {
    const snapshot = await getDocs(
      query(
        collection(firestore, "comments"),
        where("formId", "==", id),
        orderBy("createdAt", "desc"),
        orderBy("__name__", "desc"),
        ...(lastVisible ? [startAfter(lastVisible)] : []),
        limit(pageSize + 1),
      ),
    );

    const docs = snapshot.docs;
    const hasMore = docs.length > pageSize;
    const sliced = hasMore ? docs.slice(0, pageSize) : docs;
    const lastDoc = sliced.at(-1) ?? null;

    const commentsWithDisplayNames: Comment[] = await Promise.all(
      sliced.map(async (doc) => {
        const data = doc.data();
        const displayName = await fetchUserDisplayNameClient(data.uid);

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

    return {
      comments: commentsWithDisplayNames,
      lastDoc,
      hasMore,
    };
  } catch {
    toast.error("댓글 목록을 불러오지 못했습니다.");
    return { comments: [], lastDoc: null, hasMore: false };
  }
};
