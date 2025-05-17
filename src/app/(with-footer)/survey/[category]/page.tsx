import CommonList from "@/components/list/commonList";

export default async function SurveyList ({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const resolvedParams = await searchParams;
  const { cat = 'all'} = resolvedParams;
  
  return <CommonList topic={'survey'} category={cat} />;
};