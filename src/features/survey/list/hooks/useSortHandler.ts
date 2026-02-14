"use client";

import { useRouter, useSearchParams } from "next/navigation";

/**
 * 정렬 핸들러 훅
 * URL 쿼리 파라미터로 정렬 타입 변경
 * @returns {{ onChangeSortType: (newType: string) => void }} 정렬 타입 변경 핸들러를 포함하는 객체
 */
export const useSortHandler = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * 정렬 타입 변경 핸들러
   * URL 쿼리 파라미터를 업데이트하여 정렬 변경
   * @param newType - 새로운 정렬 타입
   */
  const onChangeSortType = (newType: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", newType);

    router.push(`?${params.toString()}`);
  };

  return { onChangeSortType };
};
