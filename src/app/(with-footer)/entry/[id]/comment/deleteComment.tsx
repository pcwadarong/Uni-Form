"use client";

import { deleteCommentsAction } from "@/actions/comments";
import { INITIAL_ACTION_STATE } from "@/constants/states";
import type { ActionState } from "@/types/types";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function DeleteComment({
  formId,
  commentId,
}: { formId: string; commentId: string }) {
  const [result, formAction, isPending] = useActionState<ActionState, FormData>(
    deleteCommentsAction,
    INITIAL_ACTION_STATE,
  );

  useEffect(() => {
    if (!result) return;
    if (!result.status) {
      console.error(result.error);
    } else {
      toast("댓글이 삭제되었습니다.");
    }
  }, [result]);

  const handleSubmit = async () => {
    const confirmed = window.confirm("정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.");
    if (!confirmed) return;

    const formData = new FormData();
    formData.append("formId", formId);
    formData.append("commentId", commentId);
    formAction(formData);
  };

  return (
    <div>
      <button type="button" onClick={handleSubmit} disabled={isPending}>
        {isPending ? "삭제 중..." : "댓글 삭제"}
      </button>
    </div>
  );
}
