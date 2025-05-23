import { adminFirestore } from "@/lib/firebase/firebaseAdminConfig";
import type { Comment } from "@/types/types";

export const handleComments = async (uid: string): Promise<Comment[]> => {
  const commentsSnap = await adminFirestore
    .collection("comments")
    .where("uid", "==", uid)
    .get();

  return commentsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Comment[];
};
