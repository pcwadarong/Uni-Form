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
    <>
      <div className="overflow-hidden h-52 relative">
        {!comments ? (
          <ul className="flex flex-col gap-2">
            {[...Array(3)].map((_, idx) => (
              <Skeleton key={idx} className="h-16 w-full rounded-xl border border-gray-2" />
            ))}
          </ul>
        ) : (
          <ul>
            <div className="absolute bottom-0 left-0 w-full h-14 bg-gradient-to-t from-gray-1" />
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="w-full p-3 rounded-xl mb-2 border-[1px] border-gray-2 bg-white"
              >
                <h5 className="font-semibold">{comment.nickname}</h5>
                <p>{comment.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {hasNextPage && (
        <div className="mt-4 text-center">
          <Button
            onClick={onLoadMore}
            disabled={isFetchingNextPage}
            className="border text-sm disabled:opacity-50"
          >
            {isFetchingNextPage ? "불러오는 중..." : "더보기"}
          </Button>
        </div>
      )}
    </>
  );
}
