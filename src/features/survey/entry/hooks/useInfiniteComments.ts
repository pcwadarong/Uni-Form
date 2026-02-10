"use client";

import type { Comment } from "@/types";
import { type InfiniteData, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { type CommentPage, fetchCommentPage, fetchLastCommentSnapshot } from "../services/comments";

interface UseInfiniteCommentsParams {
  formId: string;
  initialComments: Comment[];
  lastDocId: string | null;
  initialHasNextPage: boolean;
}

/**
 * 댓글 무한 스크롤/페이지네이션 상태를 관리한다.
 * 컴포넌트에서 데이터 패칭 로직을 분리하기 위한 훅이다.
 * @param params - 초기 댓글/페이지네이션 정보
 * @returns 댓글 목록과 페이지네이션 제어 상태
 */
export const useInfiniteComments = ({
  formId,
  initialComments,
  lastDocId,
  initialHasNextPage,
}: UseInfiniteCommentsParams) => {
  const queryClient = useQueryClient();
  const [initialLastDoc, setInitialLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(
    null,
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loadInitialSnapshot = async () => {
      try {
        const snapshot = await fetchLastCommentSnapshot(lastDocId);
        setInitialLastDoc(snapshot);
      } catch (err) {
        console.error("Failed to load initial comment snapshot:", err);
      } finally {
        setReady(true);
      }
    };

    loadInitialSnapshot();
  }, [lastDocId]);

  useEffect(() => {
    if (!ready) return;
    queryClient.setQueryData<InfiniteData<CommentPage, QueryDocumentSnapshot<DocumentData> | null>>(
      ["comments", formId],
      (old) => {
        if (!old?.pages?.length) return old;
        return {
          ...old,
          pages: [
            { ...old.pages[0], lastDoc: initialLastDoc },
            ...old.pages.slice(1),
          ],
        };
      },
    );
  }, [queryClient, formId, ready, initialLastDoc]);

  const query = useInfiniteQuery<
    CommentPage,
    Error,
    InfiniteData<CommentPage>,
    [string, string],
    QueryDocumentSnapshot<DocumentData> | null
  >({
    queryKey: ["comments", formId],
    queryFn: async ({ pageParam }) => fetchCommentPage(formId, pageParam ?? null),
    getNextPageParam: (lastPage) => (lastPage.comments.length > 0 ? lastPage.lastDoc : undefined),
    initialPageParam: null,
    enabled: ready,
    initialData: ready
      ? {
          pages: [
            {
              comments: initialComments,
              lastDoc: initialLastDoc,
              hasMore: initialHasNextPage,
            },
          ],
          pageParams: [null],
        }
      : undefined,
  });

  const allComments = query.data?.pages.flatMap((page) => page.comments) ?? [];
  const hasData = (query.data?.pages?.length ?? 0) > 0;
  const isLoading = !hasData && query.isLoading;

  return {
    ready,
    allComments,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage ?? false,
    isFetchingNextPage: query.isFetchingNextPage,
    isLoading,
    isError: query.isError,
  };
};
