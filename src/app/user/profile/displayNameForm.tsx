"use client";

import { updateDisplayNameAction } from "@/actions/userProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { INITIAL_ACTION_STATE } from "@/constants/states";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import FormBlock from "./formBlock";

export default function DisplayNameForm({ displayName: initial }: { displayName: string }) {
  const [displayName, setDisplayName] = useState(initial);
  const [result, formAction, isPending] = useActionState(
    updateDisplayNameAction,
    INITIAL_ACTION_STATE,
  );

  useEffect(() => {
    if (result.status === null) return;
    toast(
      result.status
        ? "닉네임이 업데이트 되었습니다."
        : (result.error ?? "닉네임 수정을 실패했습니다."),
    );
  }, [result]);

  return (
    <FormBlock
      label="닉네임"
      htmlFor="displayName"
      error={result.status === false ? result.error : undefined}
    >
      <form className="mt-5 flex gap-2" action={formAction}>
        <Input
          id="displayName"
          name="displayName"
          type="text"
          placeholder="한글, 영문, 숫자 포함 2~10자"
          className="bg-muted dark:bg-surface"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          disabled={isPending}
          aria-label="닉네임 입력"
        />
        <Button
          type="submit"
          disabled={isPending || !displayName || displayName === initial}
          className="subtitle bg-green-400 text-white text-nowrap disabled:bg-content/20 disabled:text-content"
        >
          닉네임 변경
        </Button>
      </form>
    </FormBlock>
  );
}
