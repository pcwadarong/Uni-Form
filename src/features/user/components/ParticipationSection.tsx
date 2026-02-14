"use client";

import FormCardItem from "@/features/survey/form/components/formCardItem";
import type { Form } from "@/features/survey/types";
import Link from "next/link";
import { memo } from "react";

interface ParticipationSectionProps {
  title: string;
  forms: Form[];
  linkHref: string;
  emptyMessage: string;
}

/**
 * 참여 폼 섹션 UI 컴포넌트
 * 북마크 또는 답변한 폼 목록을 렌더링하는 순수 컴포넌트
 * @param title - 섹션 제목
 * @param forms - 표시할 폼 배열
 * @param linkHref - 더보기 링크 경로
 * @param emptyMessage - 폼이 없을 때 표시할 메시지
 */
export const ParticipationSection = memo(function ParticipationSection({
  title,
  forms,
  linkHref,
  emptyMessage,
}: ParticipationSectionProps) {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h2>{title}</h2>
        <Link href={linkHref}>모든 설문 보기</Link>
      </div>
      <ul>
        {forms.length > 0 ? (
          <ul>
            {forms.map((item) => {
              const type = item.id.startsWith("survey") ? "survey" : "recruit";
              return <FormCardItem key={item.id} type={type} item={item} />;
            })}
          </ul>
        ) : (
          <p>{emptyMessage}</p>
        )}
      </ul>
    </section>
  );
});
