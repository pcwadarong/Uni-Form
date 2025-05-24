"use client";

import { deleteCommentsAction } from "@/actions/comments";
import { INITIAL_ACTION_STATE } from "@/constants/states";
import type { ActionState } from "@/types/types";
import { useQueryClient } from "@tanstack/react-query";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function DeleteComment({
  formId,
  commentId,
}: {
  formId: string;
  commentId: string;
}) {
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ["comments", formId] });
    }
  }, [result, formId, queryClient]);

  return (
    <form
      action={async (formData) => {
        const confirmed = window.confirm("정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.");
        if (!confirmed) return;

        await formAction(formData);
      }}
    >
      <input type="hidden" name="formId" value={formId} readOnly />
      <input type="hidden" name="commentId" value={commentId} readOnly />
      <button type="submit" disabled={isPending} className="text-destructive">
        {isPending ? "삭제 중..." : "삭제"}
      </button>
    </form>
  );
}
