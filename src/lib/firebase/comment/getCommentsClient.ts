import { firestore } from "@/lib/firebase/firebaseConfig";
import type { Comment } from "@/types/types";
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
import { fetchUserDisplayNameClient } from "../user/fetchUserDisplayNameClient";

export const getCommentSnapshotById = async (
  id: string,
): Promise<QueryDocumentSnapshot<DocumentData> | null> => {
  try {
    const ref = doc(firestore, "comments", id);
    const snap = await getDoc(ref);

    return snap.exists() ? (snap as QueryDocumentSnapshot<DocumentData>) : null;
  } catch (err) {
    console.error("📛 Failed to get comment snapshot:", err);
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
  } catch (error) {
    console.error("Error fetching paginated comments:", error);
    return { comments: [], lastDoc: null, hasMore: false };
  }
};
