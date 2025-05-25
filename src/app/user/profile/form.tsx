"use client";

import { updateUserProfileAction } from "@/actions/updateUserProfile";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputBlock from "./inputBlock";
import SelectBlock from "./selectBlock";

import { toast } from "sonner";

import { INITIAL_ACTION_STATE } from "@/constants/states";
import {
  GENDER_OPTIONS,
  GRADE_OPTIONS,
  type GenderType,
  type GradeType,
  REGION_OPTIONS,
  type RegionType,
} from "@/constants/userProfile";
import { type ProfileUpdateInput, profileUpdateSchema } from "@/lib/validation/userProfileSchema";

import type { ActionState } from "@/types/types";
import type { UserAuth, UserProfileFields } from "@/types/userType";

import { zodResolver } from "@hookform/resolvers/zod";
import { getAuth, updateProfile } from "firebase/auth";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function ClientProfileForm({ profile }: { profile: UserProfileFields & UserAuth }) {
  const [displayName, setDisplayName] = useState(profile.displayName);
  const auth = getAuth();
  const isGoogleUser = profile.providerId === "google.com";

  const [result, formAction, isPending] = useActionState<ActionState, FormData>(
    updateUserProfileAction,
    INITIAL_ACTION_STATE,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ProfileUpdateInput>({
    resolver: zodResolver(profileUpdateSchema),
    mode: "all",
    defaultValues: {
      university: profile.school?.university || "",
      major: profile.school?.major || "",
      grade: profile.school?.grade as GradeType | undefined,
      gender: profile.gender as GenderType | undefined,
      region: profile.region as RegionType | undefined,
      age: String(profile.age ?? ""),
    },
  });

  useEffect(() => {
    if (result.status === null) return;
    if (!result.status) toast(result.error ?? "회원정보 수정이 실패했습니다.");
    else {
      toast("회원정보가 업데이트 되었습니다.");
      reset();
    }
  }, [result, reset]);

  const handleNicknameChange = async () => {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, { displayName });
    alert("닉네임이 변경되었습니다.");
  };

  const containerClass = "rounded-xl shadow-md bg-tone1 p-6 grow shrink-0";

  return (
    <form action={formAction} onSubmit={handleSubmit(() => {})} className="p-6 space-y-10">
      {!isGoogleUser && (
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
                  />
                </div>
                <div className="mt-2 flex gap-2">
                  <Button className="subtitle bg-content/10">사진 변경</Button>
                  <Button className="subtitle bg-content/10">사진 삭제</Button>
                </div>
              </div>
            </div>
            <div className={containerClass}>
              <label htmlFor="displayName" className={"subtitle"}>
                닉네임
              </label>
              <div className="mt-5 flex gap-2">
                <Input
                  id="displayName"
                  type="text"
                  className="bg-muted dark:bg-surface"
                  value={displayName}
                  disabled={isGoogleUser}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
                <Button
                  disabled={isGoogleUser}
                  onClick={handleNicknameChange}
                  className="subtitle bg-content/10 text-nowrap"
                >
                  닉네임 변경
                </Button>
              </div>
            </div>
          </div>
          <hr className="mt-10 border-gray-300" />
        </section>
      )}

      <section>
        <h2 className="body1 mb-4">학교 정보</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputBlock
            label="대학교"
            {...register("university")}
            error={errors.university}
            isPending={isPending}
          />
          <InputBlock
            label="학과"
            {...register("major")}
            error={errors.major}
            isPending={isPending}
          />
          <SelectBlock
            label="학년"
            {...register("grade")}
            options={GRADE_OPTIONS}
            error={errors.grade}
          />
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center gap-4">
          <h2 className="body1">추가 개인정보</h2>
          <span className="caption text-content/50">* 오직 설문 입력용으로만 사용됩니다.</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SelectBlock
            label="성별"
            {...register("gender")}
            options={GENDER_OPTIONS}
            error={errors.gender}
          />
          <InputBlock
            label="출생연도"
            {...register("age")}
            error={errors.age}
            isPending={isPending}
          />
          <SelectBlock
            label="거주지역"
            {...register("region")}
            options={REGION_OPTIONS}
            error={errors.region}
          />
        </div>
      </section>

      <div className="flex items-center justify-between mt-10">
        <div className="space-x-4">
          <button
            type="button"
            className="text-sm text-red-500 underline underline-offset-4"
            onClick={() => {
              alert("탈퇴 기능 연결 예정");
            }}
          >
            탈퇴하기
          </button>
          <button
            type="button"
            className="text-sm text-gray-500 underline underline-offset-4"
            onClick={() => {
              alert("비밀번호 변경 기능 연결 예정");
            }}
          >
            비밀번호 변경
          </button>
        </div>

        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={!isValid}
            isPending={isPending}
            className="bg-green-400 text-white"
          >
            {isPending ? "저장 중..." : "저장하기"}
          </Button>
          <Button
            type="button"
            onClick={() => reset()}
            disabled={isPending}
            className="bg-white text-green-400 border-green-300 border"
          >
            취소하기
          </Button>
        </div>
      </div>
    </form>
  );
}
