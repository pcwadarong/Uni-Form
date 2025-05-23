import { firestore } from "@/lib/firebase/firebaseConfig";
import { deleteDoc, doc, getDoc } from "firebase/firestore";

export async function deleteComment(commentId: string, currentUid: string) {
  if (!commentId) return { status: false, error: "삭제할 댓글 ID가 없습니다." };

  const commentRef = doc(firestore, "comments", commentId);
  const commentSnap = await getDoc(commentRef);
  if (!commentSnap.exists()) return { status: false, error: "댓글을 찾을 수 없습니다." };

  const commentData = commentSnap.data();

  if (commentData.uid !== currentUid) {
    return { status: false, error: "본인 댓글만 삭제할 수 있습니다." };
  }

  await deleteDoc(commentRef);
  return { status: true };
}
