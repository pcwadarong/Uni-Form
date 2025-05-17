"use client";

import BubbleChat from "@/components/svg/bubble-chat";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchComments } from "@/lib/firebase/fetchDatas";
import { useQuery } from "@tanstack/react-query";
import Reaction from "@/components/survey/reaction";

interface Props {
  itemId: string;
  showMeta?: boolean;
  startDate?: string;
  endDate?: string;
  responses?: string[];
  comments?: string[];
}

export default function Comments({
  itemId,
  showMeta = false,
  startDate,
  endDate,
  responses,
  comments,
}: Props) {
  const {
    data: commentsList,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["comments", itemId],
    queryFn: () => fetchComments(itemId),
    enabled: !!itemId,
  });

  if (isError) {
    return (
      <div className="text-red-500 text-sm text-center py-4">
        댓글을 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <>
      {showMeta && startDate && endDate && (
        <div className="flex justify-between">
          <span className="caption text-gray-4 truncate">{`${startDate} ~ ${endDate}`}</span>
          {responses && comments && <Reaction responses={responses} comments={comments} />}
        </div>
      )}
      <div className="overflow-hidden h-52 relative">
        {isFetching ? (
          <ul className="flex flex-col gap-2">
            {[...Array(3)].map((_, idx) => (
              <Skeleton key={idx} className="h-16 w-full rounded-xl border border-gray-2" />
            ))}
          </ul>
        ) : commentsList && commentsList.length > 0 ? (
          <ul>
            <div className="absolute bottom-0 left-0 w-full h-14 bg-gradient-to-t from-gray-1" />
            {commentsList.map((comment) => (
              <li
                key={comment.id}
                className="w-full p-3 rounded-xl mb-2 border-[1px] border-gray-2 bg-white"
              >
                <h5 className="font-semibold">{comment.nickname}</h5>
                <p>{comment.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="h-52 border-[1px] border-gray-2 bg-white rounded-xl text-gray-3 flex flex-col gap-3 justify-center items-center">
            <BubbleChat />
            <p>아직 댓글이 없어요. 첫 댓글을 남겨보세요!</p>
          </div>
        )}
      </div>
    </>
  );
}
