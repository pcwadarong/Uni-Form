import SearchedList from "@/features/survey/list/components/search/searchedList";

/**
 * 검색 결과 페이지 컴포넌트
 * 설문조사와 모집공고 검색 결과를 표시
 * @param searchParams - URL 쿼리 파라미터 (검색어 q)
 */
const SearchedResults = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) => {
  const resolvedParams = await searchParams;
  const { q = "" } = resolvedParams;

  return (
    <section className="mt-10 flex w-full flex-col items-center justify-center">
      <div className="w-full 2xl:w-min">
        <h3 className="title2 ml-5 2xl:m-0">Surveys</h3>
        <SearchedList query={q} topic="survey" />
      </div>
      <div className="w-full 2xl:w-min">
        <h3 className="title2 ml-5 2xl:m-0">Recruits</h3>
        <SearchedList query={q} topic="recruit" />
      </div>
    </section>
  );
};

export default SearchedResults;
