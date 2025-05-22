"use client";

import { useEncryptedEntryNavigation } from "@/hooks/useEncryptedEntryNavigation";

interface Props {
  id: string;
  title: string;
  content: string;
}

export default function CommentItem({ id, title, content }: Props) {
  const { navigate, handleKeyDown } = useEncryptedEntryNavigation();

  return (
    <li className="list-none">
      <button
        type="button"
        onClick={() => navigate(id)}
        onKeyDown={handleKeyDown(id)}
        className="w-full text-left px-6 py-4 border border-gray-300 flex-1 rounded-3xl text-ellipsis overflow-hidden cursor-pointer"
      >
        <p className="mb-2 subtitle">{content}</p>
        <p className="caption text-gray-400">{title}</p>
      </button>
    </li>
  );
}
