import { decrypt } from "@/lib/utils/crypoto";
import { notFound } from "next/navigation";
//import SurveyInfo from '@/components/create/surveyInfo';
//import { useSuspenseQuery } from '@tanstack/react-query';
//import { fetchDetail } from '@/firebase/fetchDatas';
//import { useSurveyStore } from '@/store/survey';
//import { useEffect } from 'react';
//import Questions from '@/components/create/questions';

export const dynamic = "force-dynamic";

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
