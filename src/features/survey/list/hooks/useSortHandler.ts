"use client";

import { useRouter, useSearchParams } from "next/navigation";

/**
 * 정렬 핸들러 훅
 * URL 쿼리 파라미터로 정렬 타입 변경
 * @returns 정렬 타입 변경 함수
 */
export const useSortHandler = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onChangeSortType = (newType: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", newType);

    router.push(`?${params.toString()}`);
  };

  return { onChangeSortType };
};
