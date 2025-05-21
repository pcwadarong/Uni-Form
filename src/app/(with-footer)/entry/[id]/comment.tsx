"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Comment } from "@/types";
import DeleteComment from "./deleteComment";

interface Props {
  formId: string;
  comments: Comment[];
  loadMore: () => void;
  hasNextPage: boolean;
  isFetching: boolean;
  isLoading: boolean;
  isError?: boolean;
  totalCount: number;
}

export default function Comments({
  formId,
  comments,
  loadMore,
  hasNextPage,
  isFetching,
  isLoading,
  isError,
  totalCount,
}: Props) {
  return (
    <section>
      <h3>{`댓글 목록 (${totalCount})`}</h3>

      {isLoading ? (
        <ul className="mt-4 space-y-3">
          {[...Array(3)].map((_, idx) => (
            <Skeleton key={idx} className="h-16 w-full rounded-xl border border-gray-2" />
          ))}
        </ul>
      ) : isError ? (
        <p className="mt-4 text-sm text-red-500">추가 댓글을 불러오지 못했습니다.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {comments.map((comment) => (
            <li key={comment.id} className="px-4 py-3 rounded-xl border border-gray-300">
              <span className="font-semibold">{comment.nickname}</span>
              <span className="ml-2 caption">{new Date(comment.createdAt).toLocaleString()}</span>
              <p>{comment.content}</p>
              <DeleteComment formId={formId} commentId={comment.id} />
            </li>
          ))}
        </ul>
      )}

      {hasNextPage && comments.length < totalCount && !isLoading && !isError && (
        <div className="mt-4 text-center">
          <Button
            onClick={loadMore}
            disabled={isFetching}
            className="border border-gray-400 hover:bg-gray-200 text-sm disabled:opacity-50"
          >
            {isFetching ? "불러오는 중..." : "더보기"}
          </Button>
        </div>
      )}
    </section>
  );
}
