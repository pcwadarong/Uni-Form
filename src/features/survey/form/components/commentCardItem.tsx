"use client";

import type { Comment } from "@/features/survey/form/types";
import { useEncryptedEntryNavigation } from "@/features/user/hooks/useEncryptedEntryNavigation";

interface Props {
  item: Comment;
}

/**
 * 댓글 카드 아이템 컴포넌트
 * 댓글 정보를 표시하고 해당 설문 상세 페이지로 이동
 * @param item - 댓글 데이터
 */
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
        <p className="subtitle mb-2 text-ellipsis">{item.content}</p>
        <p className="caption text-gray-400">{item.formTitle}</p>
      </button>
    </li>
  );
}
