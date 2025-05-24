"use client";

import { createCommentsAction } from "@/actions/comments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { INITIAL_ACTION_STATE } from "@/constants/states";
import type { ActionState } from "@/types/types";
import { useQueryClient } from "@tanstack/react-query";
import { getAuth } from "firebase/auth";
import { type FormEvent, useActionState, useEffect, useMemo, useRef } from "react";
import { toast } from "sonner";

export default function CreateComments({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);

  const uid = useMemo(() => {
    const auth = getAuth();
    return auth.currentUser?.uid ?? "unknown";
  }, []);

  const [result, formAction, isPending] = useActionState<ActionState, FormData>(
    createCommentsAction,
    INITIAL_ACTION_STATE,
  );

  useEffect(() => {
    if (result.status === null) return;
    if (!result.status) {
      console.warn("댓글 작성 실패:", result.error);
      toast("댓글 작성에 실패했습니다. 다시 시도해주세요.");
    } else {
      toast("댓글이 작성되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
      formRef.current?.reset();
    }
  }, [result, id, queryClient]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (uid === "unknown") {
      toast("로그인이 필요합니다.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    formData.set("formId", id);
    formAction(formData);
  };

  return (
    <section aria-labelledby="create-comments">
      <h3 id="create-comments" className="body1">
        댓글 작성
      </h3>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        aria-labelledby="create-comments"
        className="mt-4 flex gap-2"
      >
        <Input
          required
          name="content"
          disabled={isPending}
          placeholder={
            uid === "unknown" ? "로그인하면 댓글을 남길 수 있습니다." : "댓글을 남겨보세요."
          }
          className="border-2"
        />
        <Button type="submit" disabled={isPending} className="text-nowrap bg-green-400 text-white">
          {isPending ? "작성 중..." : "작성하기"}
        </Button>
      </form>
    </section>
  );
}
