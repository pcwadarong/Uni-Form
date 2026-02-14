"use client";

import SectionHeader from "@/features/shared/ui/sectionHeader";
import FormCardItem from "@/features/survey/form/components/formCardItem";
import type { Form } from "@/features/survey/types";
import { memo } from "react";

interface MyFormsSectionProps {
  title: string;
  forms: Form[];
  linkHref: string;
  emptyMessage: string;
}

/**
 * 내 폼 목록 섹션 UI 컴포넌트
 * 생성한 폼 또는 임시 저장 폼 목록을 렌더링하는 순수 컴포넌트
 * @param title - 섹션 제목
 * @param forms - 표시할 폼 배열
 * @param linkHref - 더보기 링크 경로
 * @param emptyMessage - 폼이 없을 때 표시할 메시지
 */
export const MyFormsSection = memo(function MyFormsSection({
  title,
  forms,
  linkHref,
  emptyMessage,
}: MyFormsSectionProps) {
  return (
    <section>
      <SectionHeader title={title} linkHref={linkHref} />
      <ul>
        {forms.length > 0 ? (
          forms.map((item) => {
            const type = item.id.startsWith("survey") ? "survey" : "recruit";
            return <FormCardItem key={item.id} type={type} item={item} />;
          })
        ) : (
          <li className="list-none">
            <p>{emptyMessage}</p>
          </li>
        )}
      </ul>
    </section>
  );
});
