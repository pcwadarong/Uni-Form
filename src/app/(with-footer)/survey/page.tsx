import ListClient from "@/features/survey/list/components/list";
import { fetchFormList } from "@/lib/firebase/form/getFormListServer";

/**
 * 설문조사 목록 페이지 컴포넌트
 * 설문조사 목록을 표시하며 카테고리 및 정렬 옵션을 지원
 * @param searchParams - URL 쿼리 파라미터 (카테고리, 정렬 옵션)
 */
export default async function ListServerWrapper({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; sort?: string }>;
}) {
  const { cat, sort } = await searchParams;
  const initialData = await fetchFormList("survey", "public");

  return (
    <ListClient
      initialData={initialData}
      topic="survey"
      category={cat ?? "all"}
      sort={sort ?? "random"}
    />
  );
}
