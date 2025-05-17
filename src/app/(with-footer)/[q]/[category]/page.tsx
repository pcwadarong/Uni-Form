import List from "@/components/list/list";

export default async function RecruitList({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string }>;
}) {
  const resolvedParams = await searchParams;
  const { q = "survey", cat = "all" } = resolvedParams;

  return <List topic={q as "survey" | "recruit"} category={cat} />;
}
