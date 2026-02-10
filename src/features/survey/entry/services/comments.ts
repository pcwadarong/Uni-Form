import {
  fetchCommentsClient,
  getCommentSnapshotById,
} from "@/lib/firebase/comment/getCommentsClient";
import type { Comment } from "@/types";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

/**
 * 댓글 페이지 데이터 타입
 */
export interface CommentPage {
  comments: Comment[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
}

/**
 * 댓글 페이지를 조회한다.
 * @param formId - 폼 ID
 * @param pageParam - 페이지네이션 기준 문서
 * @returns 댓글 페이지 데이터
 */
export const fetchCommentPage = async (
  formId: string,
  pageParam: QueryDocumentSnapshot<DocumentData> | null,
): Promise<CommentPage> => {
  return fetchCommentsClient(formId, 5, pageParam ?? null);
};

/**
 * 마지막 댓글 문서 스냅샷을 조회한다.
 * @param lastDocId - 마지막 댓글 문서 ID
 * @returns 댓글 문서 스냅샷
 */
export const fetchLastCommentSnapshot = async (lastDocId: string | null) => {
  if (!lastDocId) return null;
  return getCommentSnapshotById(lastDocId);
};
