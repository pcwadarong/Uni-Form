export const revalidate = 60 * 5;

import FormCardItem from "@/components/form/formCardItem";
import FormCardSkeleton from "@/components/form/formCardSkeleton";
import { fetchFormList } from "@/lib/firebase/form/getListServer";
import Link from "next/link";

interface FormListSectionProps {
  title: string;
  link: string;
  sortType: "recent" | "popular";
}

const FormListSection = async ({ title, link, sortType }: FormListSectionProps) => {
  const forms = await fetchFormList("survey", sortType);
  
  return (
    <article className="flex-1">
      <div className="flex justify-between items-end mb-6">
        <h2 className="title2">{title}</h2>
        <Link href={link} className="caption">
          모든 설문 보기 →
        </Link>
      </div>
      <ul className="grid grid-cols-2 gap-4 md:gap-8">
        {forms.length > 0
          ? forms.map((item) => <FormCardItem type="survey" key={item.id} item={item} />)
          : Array.from({ length: 2 }).map((_, i) => <FormCardSkeleton key={i} type="survey" />)}
      </ul>
    </article>
  );
};

const RecentPopularSurveys = async () => {
  return (
    <section className="w-full px-4 md:px-8 2xl:px-0 flex justify-center py-16">
      <div className="w-full 2xl:w-[1400px]">
        <div className="flex flex-col md:flex-row gap-14 md:gap-8">
          <FormListSection
            title="새로 등록된 설문조사"
            link="/survey?cat=all?sort=date-desc"
            sortType="recent"
          />
          <FormListSection
            title="현재 인기가 많은 설문조사"
            link="/survey?cat=all?sort=popular-asc"
            sortType="popular"
          />
        </div>
      </div>
    </section>
  );
};

export default RecentPopularSurveys;
