"use client";

import { getAuth } from "firebase/auth";
import { type FormEvent, useActionState, useEffect, useMemo, useRef } from "react";

import createCommentsAction from "@/actions/comments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { INITIAL_ACTION_STATE } from "@/constants/states";
import type { ActionState } from "@/types";

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
    if (!result) return;
    if (!result.status) {
      console.error(result.error);
    } else {
      formRef.current?.reset();
    }
  }, [result]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (uid === "unknown") {
      e.preventDefault();
      alert("로그인이 필요합니다.");
    }
  };

  return (
    <section>
      <h3>댓글 작성</h3>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={handleSubmit}
        aria-labelledby="create-comments"
        className="flex gap-2 mt-4"
      >
        <Input required name="formId" value={id} hidden readOnly />
        <Input required name="author" value={uid} hidden readOnly />
        <Input required name="context" placeholder="댓글을 입력하세요." className="border-2" />
        <Button type="submit" disabled={isPending} className="text-white bg-green-400 text-nowrap">
          {isPending ? "작성 중..." : "작성하기"}
        </Button>
      </form>
    </section>
  );
}
