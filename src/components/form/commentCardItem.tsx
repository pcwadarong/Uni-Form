"use client";

import { useEncryptedEntryNavigation } from "@/hooks/useEncryptedEntryNavigation";
import type { Comment } from "@/types";

interface Props {
  item: Comment;
}

export default function CommentItem({ item }: Props) {
  const { navigate, handleKeyDown } = useEncryptedEntryNavigation();
  
  return (
    <li className="list-none">
      <button
        type="button"
        onClick={() => navigate(item.formId)}
        onKeyDown={handleKeyDown(item.formId)}
        className="w-full text-left px-6 py-4 border border-gray-300 flex-1 rounded-3xl text-ellipsis overflow-hidden cursor-pointer"
      >
        <p className="mb-2 subtitle">{item.content}</p>
        <p className="caption text-gray-400">{item.formTitle}</p>
      </button>
    </li>
  );
}
