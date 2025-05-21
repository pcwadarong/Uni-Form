import { firestore } from "@/lib/firebase/firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";

export async function deleteComment(commentId: string) {
  if (!commentId) return { status: false, error: "no comment to remove" };
  await deleteDoc(doc(firestore, "comments", commentId));
}
