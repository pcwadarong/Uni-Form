"use client";

import { useEncryptedEntryNavigation } from "@/hooks/useEncryptedEntryNavigation";
import { fetchComments } from "@/lib/firebase/fetchDatas";
import type { Form } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";

const CommentItem: React.FC<{ item: Form }> = ({ item }) => {
  const { navigate, handleKeyDown } = useEncryptedEntryNavigation("survey");

  const { data: commentsList } = useSuspenseQuery({
    queryKey: ["comments", item.id],
    queryFn: () => fetchComments(item.id),
  });

  return (
    <li>
      <button
        type="button"
        className="p-8 border-[1px] border-gray-3 flex-1 rounded-3xl text-ellipsis overflow-hidden cursor-pointer"
        onClick={() => navigate(item.id)}
        onKeyDown={handleKeyDown(item.id)}
        tabIndex={0}
      >
        {commentsList && (
          <>
            <p className="mb-2">{commentsList[commentsList.length - 1].content}</p>
            <p className="caption text-gray-4">{item.title}</p>
          </>
        )}
      </button>
    </li>
  );
};

export default CommentItem;
