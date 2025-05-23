"use client";

import { getAuth } from "firebase/auth";
import { type FormEvent, useActionState, useEffect, useMemo, useRef } from "react";

import { createCommentsAction } from "@/actions/comments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { INITIAL_ACTION_STATE } from "@/constants/states";
import type { ActionState } from "@/types";
import { toast } from "sonner";

export default function CreateComments({ id }: { id: string }) {
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
      formRef.current?.reset();
    }
  }, [result]);

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
    <section>
      <h3 id="create-comments" className="body1">
        댓글 작성
      </h3>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        aria-labelledby="create-comments"
        className="flex gap-2 mt-4"
      >
        <Input
          required
          name="content"
          placeholder={
            uid === "unknown" ? "로그인하면 댓글을 남길 수 있습니다." : "댓글을 남겨보세요."
          }
          className="border-2"
        />
        <Button type="submit" disabled={isPending} className="text-white bg-green-400 text-nowrap">
          {isPending ? "작성 중..." : "작성하기"}
        </Button>
      </form>
    </section>
  );
}
