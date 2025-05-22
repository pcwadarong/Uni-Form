"use client";

import { useEncryptedEntryNavigation } from "@/hooks/useEncryptedEntryNavigation";

interface Props {
  id: string;
  title: string;
  content: string;
}

export default function CommentCardClient({ id, title, content }: Props) {
  const { navigate, handleKeyDown } = useEncryptedEntryNavigation();

  return (
    <li className="list-none">
      <button
        type="button"
        onClick={() => navigate(id)}
        onKeyDown={handleKeyDown(id)}
        className="w-full text-left p-8 border-[1px] border-gray-3 flex-1 rounded-3xl text-ellipsis overflow-hidden cursor-pointer"
      >
        <p className="mb-2">{content}</p>
        <p className="caption text-gray-4">{title}</p>
      </button>
    </li>
  );
}
