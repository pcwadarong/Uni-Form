"use client";

import { updateUserProfileAction } from "@/actions/userProfile";

import { Button } from "@/components/ui/button";
import DisplayNameForm from "./displayNameForm";
import InputBlock from "./inputBlock";
import ProfileImageForm from "./profileImageForm";
import SelectBlock from "./selectBlock";

import { useRouter } from "next/navigation";
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
import { getAuth } from "firebase/auth";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function ClientProfileForm({ profile }: { profile: UserProfileFields & UserAuth }) {
  const router = useRouter();

  const auth = getAuth();
  const user = auth.currentUser;
  const isGoogleUser = profile.providerId === "google.com";

  const [result, formAction, isPending] = useActionState<ActionState, FormData>(
    updateUserProfileAction,
    INITIAL_ACTION_STATE,
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<ProfileUpdateInput>({
    resolver: zodResolver(profileUpdateSchema),
    mode: "all",
    defaultValues: {
      university: profile.school?.university ?? "",
      major: profile.school?.major ?? "",
      age: profile.age ? String(profile.age) : "",
      grade: (profile.school?.grade as GradeType) ?? "선택 안 함",
      gender: (profile.gender as GenderType) ?? "선택 안 함",
      region: (profile.region as RegionType) ?? "선택 안 함",
    },
  });

  useEffect(() => {
    if (result.status === null) return;
    toast(
      result.status
        ? "회원정보가 업데이트 되었습니다."
        : (result.error ?? "회원정보 수정이 실패했습니다."),
    );
  }, [result]);

  const onSubmitProfileForm = async (data: ProfileUpdateInput) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined && value !== null && value !== "") formData.append(key, value);
    }

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="p-6 space-y-10">
      {!isGoogleUser && (
        <section aria-labelledby="account-image-displayName-section-title">
          <h2 id="account-image-displayName-section-title" className="body1 mb-4">
            기본 계정 정보
          </h2>
          <div className="flex flex-wrap gap-4">
            <ProfileImageForm user={user} photoURL={profile.photoURL ?? ""} />
            <DisplayNameForm displayName={profile.displayName ?? ""} />
          </div>
          <hr className="mt-10 border-gray-300" />
        </section>
      )}

      <form>
        <section aria-labelledby="account-school-section-title">
          <h2 id="account-school-section-title" className="body1 mb-4">
            학교 정보
          </h2>
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
              value={watch("grade")}
              options={GRADE_OPTIONS}
              error={errors.grade}
            />
          </div>
        </section>

        <section aria-labelledby="account-personalInfo-section-title">
          <div id="account-personalInfo-section-title" className="my-4 flex items-center gap-4">
            <h2 className="body1">추가 개인정보</h2>
            <span className="caption text-content/50">* 오직 설문 입력용으로만 사용됩니다.</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectBlock
              label="성별"
              {...register("gender")}
              value={watch("gender")}
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
              value={watch("region")}
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
              onClick={() => router.push("/auth/withdraw")}
            >
              탈퇴하기
            </button>
            <button
              type="button"
              className="text-sm text-gray-500 underline underline-offset-4"
              onClick={() => router.push("/auth/reset-pw")}
            >
              비밀번호 변경
            </button>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              disabled={!isValid}
              onClick={() => {
                if (confirm("정말 저장하시겠습니까?")) {
                  handleSubmit(onSubmitProfileForm)();
                }
              }}
              isPending={isPending}
              className="bg-green-400 text-white"
            >
              {isPending ? "저장 중..." : "저장하기"}
            </Button>
            <Button
              type="button"
              onClick={() => reset()}
              disabled={isPending}
              className="bg-white text-green-400 border-green-300 border dark:bg-muted"
            >
              취소하기
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
