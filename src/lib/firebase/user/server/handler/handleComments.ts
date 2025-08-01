import { adminFirestore } from "@/lib/firebase/firebaseAdminConfig";
import type { Comment } from "@/types/types";

//entry comments server와 동일
export const handleComments = async (uid: string): Promise<Comment[]> => {
  const commentsSnap = await adminFirestore
    .collection("comments")
    .where("uid", "==", uid)
    .limit(10)
    .get();

  return commentsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Comment[];
};
