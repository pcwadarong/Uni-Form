import { decrypt } from "@/lib/utils/crypoto";
import { notFound } from "next/navigation";
//import SurveyInfo from '@/features/survey/create/components/surveyInfo';
//import { useSuspenseQuery } from '@tanstack/react-query';
//import { useSurveyStore } from '@/features/survey/create/store/survey';
//import { useEffect } from 'react';
//import Questions from '@/features/survey/create/components/questions';

export const dynamic = "force-dynamic";

/**
 * 설문 분석 페이지 컴포넌트
 * 설문 응답 데이터를 분석하여 표시 (작업 중)
 * @param params - 암호화된 폼 ID를 포함한 라우트 파라미터
 */
export default async function AnalyzePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: encryptedId } = await params;
  const itemId = await decrypt(encryptedId, process.env.CRYPT_SECRET || "");
  if (!itemId) return notFound();

  return (
    <>
      <div>분석페이지 for Item ID: {itemId}</div>
      <p>분석 예정입니다.</p>
      <p>작업중!</p>
    </>
  );
}
