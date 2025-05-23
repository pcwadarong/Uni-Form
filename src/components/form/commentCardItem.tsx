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
        className="w-full cursor-pointer overflow-hidden rounded-3xl border border-gray-300 px-6 py-4 text-left"
      >
        <p className="mb-2 text-ellipsis subtitle">{item.content}</p>
        <p className="caption text-gray-400">{item.formTitle}</p>
      </button>
    </li>
  );
}
