export const dynamic = "force-dynamic";

import FormCardItem from "@/components/form/formCardItem";
import NoContent from "@/components/list/noContent";
import { fetchFormList } from "@/lib/firebase/form/getListServer";

interface Props {
  query: string;
  topic: "survey" | "recruit";
}

const SearchedList = async ({ topic, query }: Props) => {
  const data = await fetchFormList(topic, "public");
  const filteredList = data.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <section className="2xl:flex w-full 2xl:w-[1400px] gap-10 my-20 px-4 2xl:px-0">
      <div className="grow">
        {filteredList.length === 0 ? (
          <NoContent />
        ) : (
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {filteredList.map((item) => (
              <FormCardItem type={topic} key={item.id} item={item} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default SearchedList;
