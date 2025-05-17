import { firestore } from "@/lib/firebase/firebaseConfig";
import type { Comment } from "@/types";
import {
  type DocumentData,
  type QueryDocumentSnapshot,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { fetchUserDataClient } from "../user/getClient";

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
    const commentRef = collection(firestore, "comments");
    let baseQuery = query(
      commentRef,
      where("surveyId", "==", id),
      orderBy("id", "desc"),
      limit(pageSize),
    );

    if (lastVisible) {
      baseQuery = query(baseQuery, startAfter(lastVisible));
    }

    const snapshot = await getDocs(baseQuery);
    const lastDoc = snapshot.docs[snapshot.docs.length - 1];

    const commentsWithNicknames: Comment[] = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const data = doc.data();
        const nickname = await fetchUserDataClient(data.uid, "nickname");

        return {
          id: doc.id,
          surveyId: data.surveyId,
          uid: data.uid,
          content: data.content,
          nickname: typeof nickname === "string" ? nickname : "",
        };
      }),
    );

    return {
      comments: commentsWithNicknames,
      lastDoc,
      hasMore: snapshot.size === pageSize,
    };
  } catch (error) {
    console.error("Error fetching paginated comments:", error);
    return { comments: [], lastDoc: null, hasMore: false };
  }
};
