import SearchedList from "./searchedList";

const SearchedResults = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) => {
  const resolvedParams = await searchParams;
  const { q = ""} = resolvedParams;

  return (
    <section className="mt-10 w-full flex flex-col items-center justify-center">
      <div className="w-full 2xl:w-min">
        <h3 className="ml-5 2xl:m-0 title2">Surveys</h3>
        <SearchedList query={q} topic="survey" />
      </div>
      <div className="w-full 2xl:w-min">
        <h3 className="ml-5 2xl:m-0 title2">Recruits</h3>
        <SearchedList query={q} topic="recruit" />
      </div>
    </section>
  );
};

export default SearchedResults;
