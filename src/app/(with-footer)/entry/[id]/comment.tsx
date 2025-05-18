"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Comment } from "@/types";

interface Props {
  comments: Comment[];
  onLoadMore: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export default function Comments({ comments, onLoadMore, hasNextPage, isFetchingNextPage }: Props) {
  return (
    <section>
      <h3>댓글 목록</h3>

        {!comments ? (
          <ul className="mt-4 space-y-3">
            {[...Array(3)].map((_, idx) => (
              <Skeleton key={idx} className="h-16 w-full rounded-xl border border-gray-2" />
            ))}
          </ul>
        ) : (
          <ul className="mt-4 space-y-3">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="px-4 py-3 rounded-xl border border-gray-300"
              >
                <h5 className="font-semibold">{comment.nickname}</h5>
                <p className="">{comment.content}</p>
              </li>
            ))}
          </ul>
        )}

      {(
        <div className="mt-4 text-center">
          <Button
            onClick={onLoadMore}
            disabled={isFetchingNextPage}
            className="border border-gray-400 hover:bg-gray-200 text-sm disabled:opacity-50"
          >
            {isFetchingNextPage ? "불러오는 중..." : "더보기"}
          </Button>
        </div>
      )}
    </section>
  );
}
