"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/authProvider";
import type { Comment } from "@/types/types";
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
  const { uid } = useAuth();

  return (
    <section aria-labelledby="comment-list-heading">
      <h3 id="comment-list-heading" className="body1">
        {`댓글 목록 (${totalCount})`}
      </h3>

      {isLoading ? (
        <ul className="mt-4 space-y-3">
          {[...Array(3)].map((_, idx) => (
            <li key={idx}>
              <Skeleton className="w-full h-16 rounded-xl border border-gray-200" />
            </li>
          ))}
        </ul>
      ) : isError ? (
        <p className="mt-4 text-sm text-red-500">추가 댓글을 불러오지 못했습니다.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {comments.map((comment) => (
            <li key={comment.id} className="rounded-xl border border-gray-300 px-4 py-3">
              <span className="font-semibold">{comment.nickname}</span>
              <span className="ml-2 caption">
                {comment.createdAt && new Date(comment.createdAt).toLocaleString()}
              </span>
              <p>{comment.content}</p>
              {uid === comment.uid && <DeleteComment formId={formId} commentId={comment.id} />}
            </li>
          ))}
        </ul>
      )}

      {hasNextPage && comments.length < totalCount && !isLoading && !isError && (
        <div className="mt-4 text-center">
          <Button
            onClick={loadMore}
            disabled={isFetching}
            className="text-sm border border-gray-400 hover:bg-gray-200 disabled:opacity-50"
          >
            {isFetching ? "불러오는 중..." : "더보기"}
          </Button>
        </div>
      )}
    </section>
  );
}
