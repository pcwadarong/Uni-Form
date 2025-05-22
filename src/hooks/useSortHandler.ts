"use client";

import { useRouter, useSearchParams } from "next/navigation";

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
