"use client";

import { updateDisplayNameAction } from "@/actions/userProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { UserAuth, UserProfileFields } from "@/types/userType";

import { INITIAL_ACTION_STATE } from "@/constants/states";
import type { ActionState } from "@/types/types";

import { type User, updateProfile } from "firebase/auth";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export default function AccountProfileSection({
  profile,
  user,
}: {
  profile: UserProfileFields & UserAuth;
  user: User | null;
}) {
  const [displayName, setDisplayName] = useState(profile.displayName);

  const [result, formAction, isPending] = useActionState<ActionState, FormData>(
    updateDisplayNameAction,
    INITIAL_ACTION_STATE,
  );

  useEffect(() => {
    if (result.status === null) return;
    if (!result.status) toast(result.error ?? "닉네임 수정을 실패했습니다.");
    else {
      toast("닉네임이 업데이트 되었습니다.");
    }
  }, [result]);

  const handleNicknameChange = async () => {
    if (!user) return;
    await updateProfile(user, { displayName });
    toast("닉네임이 변경되었습니다.");
  };

  const containerClass = "rounded-xl shadow-md bg-tone1 p-6 grow md:shrink-0";

  return (
    <section>
      <h2 className="body1 mb-4">기본 계정 정보</h2>

      <div className="flex gap-4 flex-wrap">
        <div className={containerClass}>
          <h3 className="subtitle">프로필 사진</h3>
          <div className="mt-3 flex items-center gap-6">
            <div className="aspect-square w-16 overflow-hidden rounded-full border flex items-center justify-center">
              <Image
                src={profile.photoURL || "/preview.jpg"}
                alt="프로필 사진"
                width={80}
                height={80}
                className="w-full h-full object-cover"
                priority={true}
              />
            </div>
            <div className="mt-2 flex gap-2">
              <Button className="subtitle bg-content/10">사진 변경</Button>
              <Button className="subtitle bg-content/10">사진 삭제</Button>
            </div>
          </div>
        </div>

        <form className={containerClass} action={formAction}>
          <label htmlFor="displayName" className={"subtitle"}>
            닉네임
          </label>
          <div className="mt-5 flex gap-2">
            <Input
              id="displayName"
              type="text"
              className="bg-muted dark:bg-surface"
              placeholder="한글, 영문, 숫자 포함 2~10자"
              value={displayName}
              disabled={isPending}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <Button
              disabled={isPending}
              onClick={handleNicknameChange}
              className="subtitle bg-content/10 text-nowrap"
            >
              닉네임 변경
            </Button>
          </div>
        </form>
      </div>
      <hr className="mt-10 border-gray-300" />
    </section>
  );
}
