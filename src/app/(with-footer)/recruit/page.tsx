import ListClient from "@/components/list/list";
import { fetchFormList } from "@/lib/firebase/form/getFormListServer";

export default async function ListServerWrapper({
  searchParams,
}: {
  searchParams: { cat?: string; sort?: string };
}) {
  const initialData = await fetchFormList("recruit", "public");

  return (
    <ListClient
      initialData={initialData}
      topic="recruit"
      category={searchParams.cat ?? "all"}
      sort={searchParams.sort ?? "random"}
    />
  );
}
