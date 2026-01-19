import ListClient from "@/features/survey/list/components/list";
import { fetchFormList } from "@/lib/firebase/form/getFormListServer";

export default async function ListServerWrapper({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; sort?: string }>;
}) {
  const { cat, sort } = await searchParams;
  const initialData = await fetchFormList("recruit", "public");

  return (
    <ListClient
      initialData={initialData}
      topic="recruit"
      category={cat ?? "all"}
      sort={sort ?? "random"}
    />
  );
}
