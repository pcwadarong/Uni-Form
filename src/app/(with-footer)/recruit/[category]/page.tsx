import CommonList from "@/components/list/commonList";

export default async function RecruitList ({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
})  {
  const resolvedParams = await searchParams;
  const { cat = 'all'} = resolvedParams;

  return <CommonList topic={"recruit"} category={cat} />;
};
