import { adminFirestore } from "@/lib/firebase/firebaseAdminConfig";

export async function deleteComment(commentId: string, currentUid: string) {
  const commentRef = adminFirestore.collection("comments").doc(commentId);
  const commentSnap = await commentRef.get();

  if (!commentSnap.exists) {
    return { status: false, error: "댓글을 찾을 수 없습니다." };
  }

  const commentData = commentSnap.data();

  if (!commentData) return { status: false, error: "댓글 데이터가 유효하지 않습니다." };
  if (commentData.uid !== currentUid)
    return { status: false, error: "본인 댓글만 삭제할 수 있습니다." };

  await commentRef.delete();
  return { status: true };
}
